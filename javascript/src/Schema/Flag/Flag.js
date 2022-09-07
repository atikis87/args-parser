import VoidType from "./Types/VoidType.js";
import ParsableType from "./Types/ParsableType.js";

export default class Flag {
    constructor(name, type) {
        this.validateName(name);
        this.validateType(type);

        this.name = name;
        this.type = type;
    }

    getName() {
        return this.name;
    }

    getType() {
        return this.type;
    }

    validateName(name) {
        if (!(typeof name === 'string' || name instanceof String)) {
            throw new Error(`Flag name must be a string. Given: ${typeof name}`);
        }

        if (name.length !== 1) {
            throw new Error(`Flag name must be 1 character (byte) long. Given: ${name}`);
        }

        const charCode = name.charCodeAt(0);

        if (charCode < 97 || charCode > 122) {
            throw new Error(`Flag name must be a lowercase latin letter. Given: ${name}`);
        }
    }

    validateType(type) {
        if (!(type instanceof VoidType || type instanceof ParsableType)) {
            throw new Error('Flag type must extend either VoidType or ParsableType');
        }
    }
}
