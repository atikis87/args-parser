import Flag from "./Flag/Flag.js";

export default class Schema {
    constructor() {
        this.flags = {};
    }

    getFlags() {
        return this.flags;
    }

    getFlag(flagName) {
        return this.flags[flagName] ?? null;
    }

    addFlag(flag) {
        if (!(flag instanceof Flag)) {
            throw new Error("Argument of Schema::addFlag must be instance of a Flag");
        }

        if (flag.getName() in this.flags) {
            throw new Error(`Flag ${flag.getName()} already exists in the schema.`);
        }

        this.flags[flag.getName()] = flag;
    }

    addFlags(flags) {
        flags.forEach(flag => this.addFlag(flag));
    }
}