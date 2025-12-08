import axios from "axios";

const PEPPER = "JsHgfImbfdEYogdBBS";

export async function requestSalt(email) {
    const resp = await axios.post("http://localhost:8080/api/auth/getsalt", { email });
    return resp.data?.salt || null;
}

export async function getHash(password, salt) {
    if (!salt) salt = generateSalt();
    const hash = await hashPassword(password, salt);
    return { hash, salt };
}

function generateSalt(length = 16) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array));
}

function strToArrayBuffer(str) {
    return new TextEncoder().encode(str);
}

async function hashPassword(password, salt) {
    const data = strToArrayBuffer(password + salt + PEPPER);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
}
