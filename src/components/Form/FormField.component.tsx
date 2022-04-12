import { ChangeEventHandler } from "react";
import { EInputType, IFormField } from "./Form.types";

interface IProps<T = HTMLInputElement> extends IFormField {
    onChange: ChangeEventHandler<T>;
    value: string;
}

export default function FormField<T = HTMLInputElement>({ inputType, title, name, onChange, value, maxLength, minLength }: IProps<T>) {
    switch (inputType) {
        case EInputType.textarea:
            return (
                <textarea
                    name={name}
                    maxLength={maxLength}
                    value={value}
                    className="form-control"
                    placeholder={`Enter ${title}`}
                    onChange={onChange as unknown as ChangeEventHandler<HTMLTextAreaElement>}
                />
            );
        case EInputType.email:
            return (
                <input
                    name={name}
                    maxLength={maxLength}
                    value={value}
                    className="form-control"
                    placeholder={`Enter ${title}`}
                    onChange={onChange as unknown as ChangeEventHandler<HTMLInputElement>}
                    type={inputType}
                />
            );
        case EInputType.password:
            return (
                <input
                    name={name}
                    maxLength={maxLength}
                    value={value}
                    className="form-control"
                    placeholder={`Enter ${title}`}
                    onChange={onChange as unknown as ChangeEventHandler<HTMLInputElement>}
                    type={inputType}
                />
            );
        case EInputType.date:
            return (
                <input
                    name={name}
                    maxLength={maxLength}
                    value={value}
                    className="form-control"
                    placeholder={`Enter ${title}`}
                    onChange={onChange as unknown as ChangeEventHandler<HTMLInputElement>}
                    type={inputType}
                />
            );
        default:
            return (
                <input
                    name={name}
                    maxLength={maxLength}
                    value={value}
                    className="form-control"
                    placeholder={`Enter ${title}`}
                    onChange={onChange as unknown as ChangeEventHandler<HTMLInputElement>}
                    type={inputType}
                />
            );
    }
}
