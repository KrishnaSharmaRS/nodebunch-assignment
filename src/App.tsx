import { Suspense, lazy, useState, useEffect, createContext, Dispatch, SetStateAction } from "react";
import { Routes, Route } from "react-router-dom";

import BodyContainer from "./components/BodyContainer";
import HomePage from "./pages/home";
import { auth, getUserDocument } from "./firebase/firebase.utils";
import "./App.css";

interface IState {
    currentUser: null | { [k: string]: any };
}

export const AppContext = createContext<{ state: IState; setState: Dispatch<SetStateAction<IState>> }>({
    state: {
        currentUser: null,
    },
    setState: () => {},
});

const SignInPage = lazy(() => import("./pages/sign-in"));
const SignUpPage = lazy(() => import("./pages/sign-up"));

function App() {
    const [state, setState] = useState<IState>({
        currentUser: null,
    });

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (!user) return setState((prev) => ({ ...prev, currentUser: null }));
            const doc = await getUserDocument(user);
            if (!doc) return;
            setState((prev) => ({ ...prev, currentUser: doc }));
        });
    }, []);

    return (
        <AppContext.Provider
            value={{
                state,
                setState,
            }}
        >
            <BodyContainer>
                <Suspense
                    fallback={
                        <div className="page-loader">
                            <h2>Loading...</h2>
                        </div>
                    }
                >
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/log-in" element={<SignInPage />} />
                        <Route path="/register" element={<SignUpPage />} />
                    </Routes>
                </Suspense>
            </BodyContainer>
        </AppContext.Provider>
    );
}

export default App;
