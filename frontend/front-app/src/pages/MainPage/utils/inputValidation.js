import Decimal from "decimal.js";

export function validateX(val, setXError) {
    if (val === "") {
        setXError("X can't be empty")
        return;
    } else {
        let xd;
        try {
            xd = new Decimal(val);
            } catch (e) {
                setXError("X must be a decimal from -5 to 5")
                return;
            }
            const min = new Decimal(-5);
            const max = new Decimal(5);

        if (!(xd.greaterThanOrEqualTo(min) && xd.lessThanOrEqualTo(max))) {
            setXError("X must be a decimal from -5 to 5")
            return;
        } else {
            setXError("");
        }
    }
}

export function validateY(val, setYError) {
    if (val === "") {
        setYError("Y can't be empty")
        return;
    } else {
        let yd;
        try {
            yd = new Decimal(val);
        } catch (e) {
            setYError("Y must be a decimal from -5 to 3")
            return;
        }
        const min = new Decimal(-5);
        const max = new Decimal(3);

        if (!(yd.greaterThanOrEqualTo(min) && yd.lessThanOrEqualTo(max))) {
            setYError("Y must be a decimal from -5 to 3")
            return;
        } else {
            setYError("");
        }
    }
}

export function validateR(val, setRError) {
    if (val === "") {
        setRError("R can't be empty")
        return;
    } else {
        let rd;
        try {
            rd = new Decimal(val);
        } catch (e) {
            setRError("R must be a decimal from -5 to 5")
            return;
        }
        const min = new Decimal(-5);
        const max = new Decimal(5);

        if (!(rd.greaterThanOrEqualTo(min) && rd.lessThanOrEqualTo(max))) {
            setRError("R must be a decimal from -5 to 5")
            return;
        } else {
            setRError("");
        }
    }
}