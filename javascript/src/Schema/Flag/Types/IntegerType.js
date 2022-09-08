import ParsableType from "./ParsableType.js";

const INTEGER_REGEX = /^[+-]?[1-9]\d*|0$/;

export default class IntegerType extends ParsableType {
    getName() {
        return 'integer';
    }

    validate(value) {
        return INTEGER_REGEX.test(value);
    }

    parse(value) {
        return parseInt(value, 10);
    }

    getAbsentValue() {
        return 0;
    }
}
