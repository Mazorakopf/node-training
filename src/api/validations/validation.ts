import { ObjectSchema, ValidationOptions } from "joi";

export default interface Validation {

    readonly schema: ObjectSchema;
    readonly options: ValidationOptions;
}