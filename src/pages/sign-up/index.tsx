import { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

import Form from "../../components/Form";
import { auth, createUserDocument } from "../../firebase/firebase.utils";
import { signUpFields, signUpInitialForm } from "./DATA";
import { AppContext } from "../../App";
import { useForm } from "../../utilities/hooks";

export default function SignUpPage() {
    const { setState } = useContext(AppContext);
    const [form, onChange, setForm] = useForm(signUpInitialForm);

    const onSubmit = useCallback(
        async (form: { email: string; password: string; name: string }) => {
            try {
                const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);

                await createUserDocument(user, { displayName: form.name });

                setState((prev) => ({
                    ...prev,
                    currentUser: {
                        displayName: form.name,
                        email: form.email,
                    },
                }));
                setForm({ ...signUpInitialForm });
                alert("Registeration Successful.");
            } catch (e: any) {
                console.log(e);
                alert(e.message);
            }
        },
        [setForm, setState]
    );

    return (
        <div className="border text-center">
            <h1>Register</h1>
            <div className="p-2">
                <Form fields={signUpFields} form={form} onChange={onChange} onSubmit={onSubmit} submitTitle="Register" />
            </div>
            <div className="p-2">
                <span>Already have an account?</span> <Link to="/log-in">Log In</Link>
            </div>
        </div>
    );
}
