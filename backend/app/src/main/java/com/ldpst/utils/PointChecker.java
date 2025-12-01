package com.ldpst.utils;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class PointChecker {
    public static boolean check(BigDecimal x, BigDecimal y, BigDecimal r) {

        BigDecimal halfR = r.divide(BigDecimal.valueOf(2), 10, RoundingMode.HALF_UP);
        // BigDecimal halfX = x.divide(BigDecimal.valueOf(2), 10, RoundingMode.HALF_UP);

        BigDecimal sumSquares = x.multiply(x).add(y.multiply(y));

        boolean inTriangle =
                (x.compareTo(BigDecimal.ZERO) >= 0) &&
                        (x.compareTo(r) <= 0) &&
                        (y.compareTo(BigDecimal.ZERO) <= 0) &&
                        (y.compareTo(x.add(r.negate())) >= 0);

        boolean inRectangle =
                (x.compareTo(BigDecimal.ZERO) <= 0) &&
                        (x.compareTo(halfR.negate()) >= 0) &&
                        (y.compareTo(BigDecimal.ZERO) <= 0) &&
                        (y.compareTo(r.negate()) >= 0);

        boolean inCircle =
                (x.compareTo(BigDecimal.ZERO) <= 0) &&
                        (y.compareTo(BigDecimal.ZERO) >= 0) &&
                        (sumSquares.compareTo(halfR.multiply(halfR)) <= 0);

        System.out.println("Checking: x=" + x + ", y=" + y + ", r=" + r);

        System.out.println("Results - Triangle: " + inTriangle +
                ", Rectangle: " + inRectangle +
                ", Circle: " + inCircle +
                ", Final: " + (inTriangle || inRectangle || inCircle));

        return inTriangle || inRectangle || inCircle;
    }
}
