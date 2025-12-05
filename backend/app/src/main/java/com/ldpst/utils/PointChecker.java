package com.ldpst.utils;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class PointChecker {
    public static boolean check(BigDecimal x, BigDecimal y, BigDecimal r) {
        if (r.compareTo(BigDecimal.ZERO) < 0) {
                r = r.negate();
                x = x.negate();
                y = y.negate();
        }

        BigDecimal halfR = r.divide(BigDecimal.valueOf(2), 10, RoundingMode.HALF_UP);
        // BigDecimal halfX = x.divide(BigDecimal.valueOf(2), 10, RoundingMode.HALF_UP);

        BigDecimal sumSquares = x.multiply(x).add(y.multiply(y));

        boolean inTriangle =
                (x.compareTo(BigDecimal.ZERO) >= 0) &&
                        (x.compareTo(halfR) <= 0) &&
                        (y.compareTo(BigDecimal.ZERO) >= 0) &&
                        (y.compareTo(x.negate().multiply(new BigDecimal(2)).add(r)) <= 0);

        boolean inRectangle =
                (x.compareTo(BigDecimal.ZERO) <= 0) &&
                        (x.compareTo(r.negate()) >= 0) &&
                        (y.compareTo(BigDecimal.ZERO) >= 0) &&
                        (y.compareTo(r) <= 0);

        boolean inCircle =
                (x.compareTo(BigDecimal.ZERO) <= 0) &&
                        (y.compareTo(BigDecimal.ZERO) <= 0) &&
                        (sumSquares.compareTo(r.multiply(r)) <= 0);

        System.out.println("Checking: x=" + x + ", y=" + y + ", r=" + r);

        System.out.println("Results - Triangle: " + inTriangle +
                ", Rectangle: " + inRectangle +
                ", Circle: " + inCircle +
                ", Final: " + (inTriangle || inRectangle || inCircle));

        return inTriangle || inRectangle || inCircle;
    }
}
