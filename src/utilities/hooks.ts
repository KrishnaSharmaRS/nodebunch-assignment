import { ChangeEvent, ChangeEventHandler, Dispatch, useCallback, useState } from "react";

export function useForm<T>(initialForm: T): [T, ChangeEventHandler<HTMLInputElement & HTMLTextAreaElement>, Dispatch<T>] {
    const [form, setForm] = useState({ ...initialForm });

    const onChange = useCallback(({ target: { name, value } }: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => setForm((prev) => ({ ...prev, [name]: value })), []);

    return [form, onChange, setForm];
}