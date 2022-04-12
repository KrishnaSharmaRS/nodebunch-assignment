import { signInWithEmailAndPassword } from "firebase/auth";
import { useCallback } from "react";
import { Link } from "react-router-dom";

import Form from "../../components/Form";
import { auth } from "../../firebase/firebase.utils";
import { useForm } from "../../utilities/hooks";
import { signInFields, signInInitialForm } from "./DATA";

export default function SignInPage() {
    const [form, onChange, setForm] = useForm(signInInitialForm);
    const onSubmit = useCallback(
        async (form: { email: string; password: string }) => {
            try {
                await signInWithEmailAndPassword(auth, form.email, form.password);

                setForm({ ...signInInitialForm });
                alert("Log In Successful.");
            } catch (error: any) {
                alert(error.message);
            }
        },
        [setForm]
    );

    return (
        <div className="border text-center">
            <h1>Log In</h1>
            <div className="p-2">
                <Form fields={signInFields} form={form} onChange={onChange} onSubmit={onSubmit} submitTitle="Log In" />
            </div>
            <div className="p-2">
                <span>Do not have an account?</span> <Link to="/register">Register</Link>
            </div>
        </div>
    );
}
