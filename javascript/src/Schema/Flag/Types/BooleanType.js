import VoidType from "./VoidType.js";

export default class BooleanType extends VoidType {
    getName() {
        return 'boolean';
    }

    getAbsentValue() {
        return false;
    }

    getPresentValue() {
        return true;
    }
}