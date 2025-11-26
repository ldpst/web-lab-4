import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/AuthContext";
import "./AuthPage.css";
import Snowfall from "./components/Snowflake";

function AuthPage() {
    const [type, setType] = useState("login");

    const [isMobile, setIsMobile] = useState(window.innerWidth < 500);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 645);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // const authContext = useContext(AuthContext);

    return (
        <>
            <div className="top-panel">
                <div className="center-wrapper vertical-items" id="page-title">
                    <span className="title-span">
                        {isMobile ? "Лаба №4" : "Лабораторная работа №4"}
                    </span>
                    <span className="subtitle-span">
                        {isMobile ? "по вебу" : "по веб-программированию"}
                    </span>
                </div>
            </div>
            <Snowfall />
            <div id="main-div">
                <div id="pic-div" className="center-wrapper">
                    <div className="header-div center-wrapper vertical-items">
                        <div id="name-headers" className="vertical-items">
                            <span className="subtitle-span">Выполнил:</span>
                            <span id="name-span">Мельник Фёдор Александрович</span>
                        </div>
                        <div id="subdata-headers" className="vertical-items">
                            <span className="subtitle-span">ISU: 466690</span>
                            <span className="subtitle-span">Группа: P3206</span>
                            <span className="subtitle-span">Вариант: 34323</span>
                        </div>
                    </div>
                        
                </div>
                <div id="auth-div" className="center-wrapper vertical-items">
                    
                    <div id="auth-card">
                        {
                            type === "login" ? (
                                <LoginPage setType={setType} />
                            ) : (
                                <RegisterPage setType={setType} />
                            ) 
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

function LoginPage({ setType }) {
    return ( 
        <>
            <span className="title-span">LOGIN</span>
            <div id="auth-fields" className="left-wrapper vertical-items">
                <span className="auth-field">Email:</span>
                <input 
                    className="auth-input"
                    id="email-input"
                />
                <span className="auth-field">Password:</span>
                <input 
                    className="auth-input"
                    id="password-input"
                />
                <button className="auth-input auth-btn" onClick={tryLogin}>Enter</button>
                <div
                    className="auth-input center-wrapper" 
                    id="switch-type-div"  
                >
                    <span className="text-span">Don't have an account? </span>
                    <a  className="text-span" href="#" onClick={(e) => {
                        e.preventDefault();
                        setType("register");
                    }}>
                        Create an account
                    </a>
                </div>
                <div className="center-wrapper">
                    <a className="text-span" href="#">Reset your password?</a>
                </div>
            </div>
        </>
    )
}

function RegisterPage({ setType }) {
    return ( 
        <>
            <span id="auth-title" className="title-span">SIGN UP</span>
            <div id="auth-fields" className="left-wrapper vertical-items">
                <span className="auth-field">Email:</span>
                <input 
                    className="auth-input"
                    id="email-input"
                />
                <span className="auth-field">Password:</span>
                <input 
                    className="auth-input"
                    id="password-input"
                />
                <span className="auth-field">Repeat password:</span>
                <input 
                    className="auth-input"
                    id="re-password-input"
                />
                <button className="auth-input auth-btn">Enter</button>
                <div
                    className="auth-input center-wrapper" 
                    id="switch-type-div"  
                >
                    <span className="text-span">Already have an account? </span>
                    <a className="text-span" href="#" onClick={(e) => {
                        e.preventDefault();
                        setType("login");
                    }}>
                        Login
                    </a>
                </div>
            </div> 
        </>
    )
}

function tryLogin() {
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;

    

    
}

function validateEmail({email}) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
        return true;
    } else {
        return false;
    }
}

export default AuthPage;