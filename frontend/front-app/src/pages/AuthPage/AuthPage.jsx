import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Snowfall from "./components/Snowfall";
import { tryLogin } from "./utils/loginUtils";
import { tryRegister } from "./utils/registerUtils";
import "./AuthPage.css";
import NameHeader from "./components/NameHeader";
import TopPanel from "./components/TopPanel";

function AuthPage() {
    const [type, setType] = useState("login");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 500);

    const emailRef = useRef(null);
    const emailErrorRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordErrorRef = useRef(null);
    const rePasswordRef = useRef(null);
    const rePasswordErrorRef = useRef(null);
    const authErrorRef = useRef(null);

    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 645);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <div className="top-panel">
                <TopPanel
                    isMobile={isMobile}   
                />
            </div>

            <Snowfall />

            <div id="main-div">
                <div id="pic-div" className="center-wrapper">
                    <NameHeader/>
                </div>

                <div id="auth-div" className="center-wrapper vertical-items">
                    <div id="auth-card">
                        {type === "login" ? (
                            <LoginForm
                                setType={setType}
                                tryLogin={tryLogin}
                                emailRef={emailRef}
                                emailErrorRef={emailErrorRef}
                                passwordRef={passwordRef}
                                passwordErrorRef={passwordErrorRef}
                                authErrorRef={authErrorRef}
                                authContext={authContext}
                                navigate={navigate}
                            />
                        ) : (
                            <RegisterForm
                                setType={setType}
                                tryRegister={tryRegister}
                                emailRef={emailRef}
                                emailErrorRef={emailErrorRef}
                                passwordRef={passwordRef}
                                passwordErrorRef={passwordErrorRef}
                                rePasswordRef={rePasswordRef}
                                rePasswordErrorRef={rePasswordErrorRef}
                                authErrorRef={authErrorRef}
                                authContext={authContext}
                                navigate={navigate}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuthPage;
