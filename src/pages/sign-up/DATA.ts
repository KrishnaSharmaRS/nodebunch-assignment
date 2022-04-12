import { EInputType, IFormField } from "../../components/Form/Form.types";

export const signUpInitialForm = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};

export const signUpFields: IFormField[] = [
    {
        name: "name",
        title: "Name",
        inputType: EInputType.text,
        required: true,
    },
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
        minLength: 8,
    },
    {
        name: "confirmPassword",
        title: "Confirm Password",
        inputType: EInputType.password,
        required: true,
        minLength: 8,
        validate: form => form.password !== form.confirmPassword ? "Passwords do not match." : ""
    },
];
