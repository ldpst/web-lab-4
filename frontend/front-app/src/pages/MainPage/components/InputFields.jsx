import SpinnerButton from "./SpinnerButton";
import { validateX, validateY, validateR } from "../utils/inputValidation";
import { clearPoints } from "../utils/pointLogic";

export function XInputField( { xValue, setXValue, xError, setXError } ) {
    const handleXUpdate = (e) => {
        const val = e.target.value;
        setXValue(val);
        validateX(val, setXError);
    }

    return <>
        <div className="point-input-field">
            <div className="point-input-top">
                <span>X(-5..5):</span>
                {xError && <div className="input-error-div">{xError}</div>}
            </div>
            <input className="point-input"
                type="text"
                value={xValue}
                onChange={handleXUpdate}
            />
        </div>
    </>
}

export function YInputField({ yValue, setYValue, yError, setYError }) {
    const handleYUpdate = (e) => {
        const val = e.target.value;
        setYValue(val);
        validateY(val, setYError);
    }

    return <>
        <div className="point-input-field">
            <div className="point-input-top">
                <span>Y(-5..3):</span>
                {yError && <div className="input-error-div">{yError}</div>}
            </div>
            <SpinnerButton
                value={yValue}
                setValue={setYValue}
                handleValUpdate={handleYUpdate}
            />
        </div>
    </>
}

export function RInputField({ rValue, setRValue, rError, setRError }) {
    const handleRUpdate = (e) => {
        const val = e.target.value;
        setRValue(val);
        validateR(val, setRError);
    }

    return <>
        <div className="point-input-field">
            <div className="point-input-top">
                <span>R(-5..5):</span>
                {rError && <div className="input-error-div">{rError}</div>}
            </div>
            <input 
                className="point-input"
                type="text"
                value={rValue}
                onChange={handleRUpdate}
            />
        </div>
    </>
}

export function InputButtons({ xValue, yValue, xError, yError, rError, graphRef, token, loadAllPoints }) {
    const handleSendClick = async () => {
        if (xError === "" && yError === "" && rError === "") {
            graphRef.current.addPoint(xValue, yValue);
            loadAllPoints();
        }
    };

    return <>
        <div className="point-input-btns">
            <button className="point-input-btn"
                onClick={handleSendClick}
            >
                SEND
            </button>
            <button
                className="point-input-btn"
                onClick={() => {
                    if (clearPoints(token)) {
                        graphRef.current.clearPoints();
                    }
                    setTimeout(loadAllPoints, 200);
                }}
            >
                CLEAR
            </button>
        </div>
    </>
}