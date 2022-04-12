import { EInputType, IFormField } from "../../components/Form/Form.types";

export const signInInitialForm = {
    email: "",
    password: "",
};

export const signInFields: IFormField[] = [
    {
        name: "email",
        title: "Email",
        inputType: EInputType.email,
        required: true,
    },
    {
        name: "password",
        title: "Password",
        inputType: EInputType.password,
        required: true,
    },
];
