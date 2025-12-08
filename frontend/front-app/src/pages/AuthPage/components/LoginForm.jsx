import React, { useRef } from "react";

export default function LoginForm({ setType, tryLogin, emailRef, emailErrorRef, passwordRef, passwordErrorRef, authErrorRef, authContext, navigate }) { 

    return (
        <>
            <span className="title-span">LOGIN</span>
            <div id="auth-fields" className="left-wrapper vertical-items">
                <div className="div-with-error">
                    <span className="auth-field">Email:</span>
                    <div ref={emailErrorRef} className="input-error">error</div>
                </div>
                <input ref={emailRef} className="auth-input" id="email-input" />
                
                <div className="div-with-error">
                    <span className="auth-field">Password:</span>
                    <div ref={passwordErrorRef} className="input-error">error</div>
                </div>
                <input ref={passwordRef} className="auth-input" id="password-input" type="password" />
                
                <button className="auth-input auth-btn" onClick={() => tryLogin(emailRef.current.value, passwordRef.current.value, emailRef, emailErrorRef, passwordRef, passwordErrorRef, authErrorRef, authContext, navigate)}>Enter</button>
                
                <div ref={authErrorRef} id="auth-error">Ошибка</div>
                
                <div className="auth-input center-wrapper" id="switch-type-div">
                    <span className="text-span">Don't have an account? </span>
                    <a href="#" className="text-span" onClick={(e) => { e.preventDefault(); setType("register"); }}>Create an account</a>
                </div>
            </div>
        </>
    );
}
