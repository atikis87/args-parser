import Type from "./Type.js";

export default class VoidType extends Type {
    getPresentValue() {
        return null;
    }
}
