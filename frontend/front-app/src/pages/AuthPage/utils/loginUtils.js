import { validateEmail, validatePassword, validateRePassword, errorMsg } from "./validation";
import { requestSalt, getHash } from "./authUtils";

export async function tryLogin(email, password, emailRef, emailErrorRef, passwordRef, passwordErrorRef, authErrorRef, authContext, navigate) {
        let valid = true;
        valid = valid && errorMsg(validateEmail(email), emailRef.current, emailErrorRef.current, "Invalid email");
        valid = valid && errorMsg(validatePassword(password), passwordRef.current, passwordErrorRef.current, "Empty password");

        if (!valid) return;

        const oldSalt = await requestSalt(email);
        const { hash: passwordHash } = await getHash(password, oldSalt);

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, passwordHash, salt: oldSalt })
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