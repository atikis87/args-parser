

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
}
