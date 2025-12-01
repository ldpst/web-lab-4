package com.ldpst.utils;

import java.math.BigDecimal;

public class PointValidator {
    private static final BigDecimal five = new BigDecimal(5);
    private static final BigDecimal three = new BigDecimal(3);

    public static boolean checkX(BigDecimal x) {
        if (x.compareTo(five.negate()) >= 0 && x.compareTo(five) <= 0) {
            return true;
        }
        return false;
    }

    public static boolean checkY(BigDecimal y) {
        if (y.compareTo(five.negate()) >= 0 && y.compareTo(three) <= 0) {
            return true;
        }
        return false;
    }

    public static boolean checkR(BigDecimal r) {
        if (r.compareTo(five.negate()) >= 0 && r.compareTo(five) <= 0) {
            return true;
        }
        return false;
    }
}