import React, { useRef } from "react";

export default function RegisterForm({ setType, tryRegister, emailRef, emailErrorRef, passwordRef, passwordErrorRef, rePasswordRef, rePasswordErrorRef, authErrorRef, authContext, navigate }) {

    return (
        <>
            <span className="title-span">SIGN UP</span>
            <div id="auth-fields" className="left-wrapper vertical-items">
                <div className="div-with-error">
                    <span className="auth-field">Email:</span>
                    <div ref={emailErrorRef} className="input-error">error</div>
                </div>
                <input ref={emailRef} className="auth-input" />
                
                <div className="div-with-error">
                    <span className="auth-field">Password:</span>
                    <div ref={passwordErrorRef} className="input-error">error</div>
                </div>
                <input ref={passwordRef} className="auth-input" type="password" />
                
                <div className="div-with-error">
                    <span className="auth-field">Repeat password:</span>
                    <div ref={rePasswordErrorRef} className="input-error">error</div>
                </div>
                <input ref={rePasswordRef} className="auth-input" type="password" />
                
                <button className="auth-input auth-btn" onClick={() => tryRegister(emailRef.current.value, passwordRef.current.value, rePasswordRef.current.value, emailRef, emailErrorRef, passwordRef, passwordErrorRef, rePasswordRef, rePasswordErrorRef, authErrorRef, authContext, navigate)}>Enter</button>
                
                <div ref={authErrorRef} id="auth-error">Ошибка</div>
                
                <div className="auth-input center-wrapper" id="switch-type-div">
                    <span className="text-span">Already have an account? </span>
                    <a href="#" className="text-span" onClick={(e) => { e.preventDefault(); setType("login"); }}>Login</a>
                </div>
            </div>
        </>
    );
}
