import SignInPage from "../sign-in";
import SignUpPage from "../sign-up";

import "./HomePage.css";

export default function HomePage() {
    return (
        <div className="p-5 text-center d-flex home-page">
            <div className="container">
                <SignInPage />
            </div>
            <div className="container">
                <SignUpPage />
            </div>
        </div>
    );
}
