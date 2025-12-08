import { validateEmail, validatePassword, validateRePassword, errorMsg } from "./validation";
import { requestSalt, getHash } from "./authUtils";

export async function tryRegister(email, password, rePassword, emailRef, emailErrorRef, passwordRef, passwordErrorRef, rePasswordRef, rePasswordErrorRef, authErrorRef, authContext, navigate) {
        let valid = true;
        valid = valid && errorMsg(validateEmail(email), emailRef.current, emailErrorRef.current, "Invalid email");
        valid = valid && errorMsg(validatePassword(password), passwordRef.current, passwordErrorRef.current, "Empty password");
        valid = valid && errorMsg(validateRePassword(password, rePassword), rePasswordRef.current, rePasswordErrorRef.current, "Passwords are not similar");

        if (!valid) return;

        const { hash: passwordHash, salt } = await getHash(password, null);

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, passwordHash, salt })
            });
            const data = await response.json();

            if (data.isAuth === "true") {
                authContext.login(data.token);
                navigate("/");
            } else {
                authErrorRef.current.innerText = data.error || "Unsupported";
                authErrorRef.current.style.display = "flex";
            }
        } catch (err) {
            console.error(err);
        }
    }