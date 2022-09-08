import ParsableType from "./ParsableType.js";

export default class StringType extends ParsableType {
    getName() {
        return 'string';
    }

    validate() {
        return true;
    }

    parse(value) {
        return value;
    }

    getAbsentValue() {
        return '';
    }
}