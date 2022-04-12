export enum EInputType {
    text = "text",
    textarea = "textarea",
    date = "date",
    email = "email",
    password = "password",
}

export interface IFormField {
    name: string;
    title: string;
    inputType?: EInputType;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    validate?: (form: { [k: string]: any; }) => string;
}