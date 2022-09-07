import Schema from "./Schema/Schema.js";
import VoidType from "./Schema/Flag/Types/VoidType.js";

export default class ArgumentsParser {
    constructor(schema) {
        if (!(schema instanceof Schema)) {
            throw new Error('ArgumentsParser constructor requires an instance of a Schema.');
        }

        this.schema = schema;
        this.values = {};
    }

    getValues() {
        return this.values;
    }

    getValue(flagName) {
        if (this.schema.getFlag(flagName) === null) {
            throw new Error(`Given flag name does not exist in the schema: ${flagName}`);
        }

        return this.values[flagName] ?? null;
    }

    parse(input) {
        const state = {
            flags: Object.assign({}, this.schema.getFlags()),
            tokens: input.trim().split(/\s+/).reverse().filter(t => t !== ''),
        };

        while (state.tokens.length) {
            this.parseNextToken(state);
        }

        while (Object.keys(state.flags).length) {
            this.setNextAbsentValue(state);
        }
    }

    parseNextToken(state) {
        const flag = this.parseFlag(state);
        this.values[flag.getName()] = this.getFlagValue(flag, state);

        delete state.flags[flag.getName()];
    }

    parseFlag(state) {
        const token = state.tokens.pop(),
            hyphen = token.substring(0, 1);

        if (hyphen !== '-') {
            throw new Error(`Flags must start with hyphen '-'. Given: ${token}`);
        }

        const name = token.substring(1),
            isFlagInSchema = this.schema.getFlag(name) !== null,
            isFlagAvailable = name in state.flags;

        if (!isFlagInSchema) {
            throw new Error(`Given flag name does not exist in the schema: ${name}`);
        } else if (!isFlagAvailable) {
            throw new Error(`Given flag is duplicated: ${name}`);
        }

        return state.flags[name];
    }

    getFlagValue(flag, state) {
        if (flag.getType() instanceof VoidType) {
            return flag.getType().getPresentValue();
        }

        return this.getParsableFlagValue(flag, state);
    }

    getParsableFlagValue(flag, state) {
        if (!state.tokens.length) {
            throw new Error(`Missing argument for flag: ${flag.getName()}`);
        }

        const token = state.tokens.pop();

        if (!flag.getType().validate(token)) {
            throw new Error(`Flag ${flag.getName()} requires argument of type ${flag.getType().getName()}, given value: ${token}`);
        }

        return flag.getType().parse(token);
    }

    setNextAbsentValue(state) {
        const flag = Object.values(state.flags)[0];
        this.values[flag.getName()] = flag.getType().getAbsentValue();

        delete state.flags[flag.getName()];
    }
}