import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../utils/AuthContext";
import "./AuthPage.css";
import Snowfall from "./components/Snowflake";

function AuthPage() {
    const [type, setType] = useState("login");

    const [isMobile, setIsMobile] = useState(window.innerWidth < 500);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const rePasswordRef = useRef(null);
    const emailErrorRef = useRef(null);
    const passwordErrorRef = useRef(null);
    const rePasswordErrorRef = useRef(null);
    const authErrorRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 645);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const authContext = useContext(AuthContext);

    function LoginPage({ setType }) {
        return ( 
            <>
                <span className="title-span">LOGIN</span>
                <div id="auth-fields" className="left-wrapper vertical-items">
                    <div className="div-with-error">
                        <span className="auth-field">Email:</span>
                        <div ref={emailErrorRef} className="input-error" id="email-error">error</div>
                    </div>
                    <input 
                        ref={emailRef}
                        className="auth-input"
                        id="email-input"
                    />
                    <div className="div-with-error">
                        <span className="auth-field">Password:</span>
                        <div ref={passwordErrorRef} className="input-error" id="password-error">error</div>
                    </div>
                    <input
                        ref={passwordRef}
                        className="auth-input"
                        id="password-input"
                        type="password"
                    />
                    <button className="auth-input auth-btn" onClick={tryLogin}>Enter</button>
                    <div ref={authErrorRef} id="auth-error">Ошибка</div>
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
                </div>
            </>
        )
    }

    function RegisterPage({ setType }) {
        return ( 
            <>
                <span id="auth-title" className="title-span">SIGN UP</span>
                <div id="auth-fields" className="left-wrapper vertical-items">
                    <div className="div-with-error">
                        <span className="auth-field">Email:</span>
                        <div ref={emailErrorRef} className="input-error" id="email-error">error</div>
                    </div>
                    <input 
                        ref={emailRef}
                        className="auth-input"
                        id="email-input"
                    />
                    <div className="div-with-error">
                        <span className="auth-field">Password:</span>
                        <div ref={passwordErrorRef} className="input-error" id="password-error">error</div>
                    </div>
                    <input 
                        ref={passwordRef}
                        className="auth-input"
                        id="password-input"
                        type="password"
                    />
                    <div className="div-with-error">
                        <span className="auth-field">Repeat password:</span>
                        <div ref={rePasswordErrorRef} className="input-error" id="re-password-error">error</div>
                    </div>
                    <input 
                        ref={rePasswordRef}
                        className="auth-input"
                        id="re-password-input"
                        type="password"
                    />
                    <button className="auth-input auth-btn" onClick={tryRegister}>Enter</button>
                    <div ref={authErrorRef} id="auth-error">Ошибка</div>
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

    async function tryLogin() {
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();
        
        let f = true;
        f = f && errorMsg(validateEmail(email), emailRef.current, emailErrorRef.current, "Invalid email");
        f = f && errorMsg(validatePassword(password), passwordRef.current, passwordErrorRef.current, "Empty password");
        
        if (f === true) {
            const oldSalt = await requestSalt(email);

            const { hash: passwordHash, salt } = await getHash(password, oldSalt);
            

            axios.post('http://localhost:8080/api/auth/login', {
                "email": email,
                "passwordHash": passwordHash,
                "salt": oldSalt
            }).then(response => {
                const data = response.data;
                if (data.isAuth === "false") {
                    authErrorRef.current.innerText = data.error;
                    authErrorRef.current.style.display = "flex";
                } else if (data.isAuth === "true") {
                    authContext.login(data.token);
                    return navigate("/");
                } else {
                    authErrorRef.current.innerText = "Unsupported";
                    authErrorRef.current.style.display = "flex";
                }
            }).catch(error => {
                console.error(error);
            });
        }

        
    }

    async function tryRegister() {
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();
        const rePassword = rePasswordRef.current.value.trim();
        
        let f = true;
        f = f && errorMsg(validateEmail(email), emailRef.current, emailErrorRef.current, "Invalid email");
        f = f && errorMsg(validatePassword(password), passwordRef.current, passwordErrorRef.current, "Empty password");
        f = f && errorMsg(validateRePassword(password, rePassword), rePasswordRef.current, rePasswordErrorRef.current, "Passwords are not similar");
        
        if (f === true) {
            const { hash: passwordHash, salt } = await getHash(password, null);

            axios.post('http://localhost:8080/api/auth/register', {
                "email": email,
                "passwordHash": passwordHash,
                "salt": salt
            }).then(response => {
                const data = response.data;
                if (data.isAuth === "false") {
                    authErrorRef.current.innerText = data.error;
                    authErrorRef.current.style.display = "flex";
                } else if (data.isAuth === "true") {
                    authContext.login(data.token);
                    return navigate("/")
                } else {
                    authErrorRef.current.innerText = "Unsupported";
                    authErrorRef.current.style.display = "flex";
                }
            }).catch(error => {
                console.error(error);
            });
        }
    }

    async function requestSalt(email) {
        const resp = await axios.post("http://localhost:8080/api/auth/getsalt", {
            "email": email
        });
        return resp.data === null ? null : resp.data.salt;
    }

    async function getHash(password, salt) {
        const PEPPER = "JsHgfImbfdEYogdBBS";

        function generateSalt(length = 16) {
            const array = new Uint8Array(length);
            crypto.getRandomValues(array);
            return btoa(String.fromCharCode(...array));
        }

        function strToArrayBuffer(str) {
            const encoder = new TextEncoder();
            return encoder.encode(str);
        }

        async function hashPassword(password, salt) {
            const data = strToArrayBuffer(password + salt + PEPPER);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return btoa(String.fromCharCode(...hashArray));
        }

        if (salt === null) {
            salt = generateSalt();
        }
        const hash = await hashPassword(password, salt);

        return { hash, salt };
    }

    function errorMsg(result, input, error, text) {
        if (!result) {
            error.innerText = text;
            error.style.display = "block";
            input.style.border = "2px solid #DE5050";
            return false;
        } else {
            error.style.display = "none";
            input.style.backgroundColor = "white";
            input.style.border = "1px solid #8b8b8b";
            return true;
        }
    }

    function validateEmail(email) {
        const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
        if (emailRegex.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    function validatePassword(password) {
        if (password !== null && password !== "") {
            return true;
        }
        return false;
    }

    function validateRePassword(password, rePassword) {
        if (password !== rePassword) {
            return false;
        }
        return true;
    }

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

export default AuthPage;