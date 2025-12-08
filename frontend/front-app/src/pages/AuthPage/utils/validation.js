export function validateEmail(email) {
    const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
    return emailRegex.test(email);
}

export function validatePassword(password) {
    return password != null && password !== "";
}

export function validateRePassword(password, rePassword) {
    return password === rePassword;
}

export function errorMsg(result, input, error, text) {
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
