import { ChangeEventHandler, FormEventHandler, useCallback } from "react";
import { useState } from "react";

import { IFormField } from "./Form.types";
import FormField from "./FormField.component";
import styles from "./Form.module.css";

interface IProps {
    fields: IFormField[];
    form: { [k: string]: any };
    onChange: ChangeEventHandler<HTMLInputElement & HTMLTextAreaElement>;
    submitTitle?: string;
    onSubmit: Function;
}

const Form = ({ fields, form, onChange, submitTitle = "Submit", onSubmit }: IProps) => {
    const [errors, setErrors] = useState<{ [k: string]: string }>({});

    const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
        (event) => {
            event.preventDefault();
            const e: { [k: string]: string } = {};

            for (const { name, title, required, minLength, validate } of fields) {
                if (required && !form[name]) e[name] = `'${title}' is a required field.`;
                else if (minLength && form[name]?.length < minLength) e[name] = `Minimum ${minLength} characters required.`;
                else if (validate) e[name] = validate(form);
            }

            setErrors(e);

            for (const key in e) if (e[key]) return;

            onSubmit(form);
        },
        [fields, form, onSubmit]
    );

    return (
        <form onSubmit={handleSubmit}>
            {fields.map(({ title, name, inputType, ...rest }, index) => (
                <div className={styles.formGroup} key={index}>
                    <label>{title}</label>
                    <FormField name={name} inputType={inputType} title={title} value={form[name]} {...rest} onChange={onChange} />
                    <div className="text-danger">{errors[name]}</div>
                </div>
            ))}
            <div className="p-3">
                <button className="btn btn-success" type="submit">
                    {submitTitle}
                </button>
            </div>
        </form>
    );
};

export default Form;
