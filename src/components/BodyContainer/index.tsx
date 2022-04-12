import { ReactElement, useContext } from "react";
import { signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../App";

import styles from "./BodyContainer.module.css";
import { auth } from "../../firebase/firebase.utils";

interface IProps {
    children: ReactElement;
}

const BodyContainer = ({ children }: IProps) => {
    const { state } = useContext(AppContext);

    return (
        <div className={styles.bodyContainer}>
            <nav>
                <NavLink to="/">
                    <span>Home Page</span>
                </NavLink>
                <NavLink to="/log-in">
                    <span>Log In</span>
                </NavLink>
                <NavLink to="/register">
                    <span>Register</span>
                </NavLink>
            </nav>
            <div className="m-2 d-flex justify-content-center">
                <h2 className="m-2">{`Current User: ${state.currentUser?.displayName || "(Not Logged In.)"}`}</h2>
                {state.currentUser?.displayName && (
                    <button className="btn btn-success" onClick={() => signOut(auth)}>
                        Log Out
                    </button>
                )}
            </div>
            <div className="body">{children}</div>
        </div>
    );
};

export default BodyContainer;
