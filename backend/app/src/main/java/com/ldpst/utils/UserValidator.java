package com.ldpst.utils;

import java.util.regex.Pattern;

public class UserValidator {
    private static final String EMAIL_REGEX =
            "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$";
    private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

    public static boolean checkEmail(String email) {
        if (email != null && !email.isEmpty()) {
            return EMAIL_PATTERN.matcher(email).matches();
        } 
        return false;
    }

    public static boolean checkPasswordHash(String passwordHash) {
        if (passwordHash != null && !passwordHash.isEmpty()) {
            return true;
        }
        return false;
    }

    public static boolean checkSalt(String salt) {
        if (salt != null && !salt.isEmpty()) {
            return true;
        }
        return false;
    }
}
