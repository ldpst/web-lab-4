

export default function SpinnerButton({ value, setValue, handleValUpdate }) {
    const increment = () => {
        let newValue = parseFloat(value) + 0.1;
        if (newValue > 3) newValue = 3;
        setValue(newValue.toFixed(1));
    }
    const decrement = () => {
        let newValue = parseFloat(value) - 0.1;
        if (newValue < -5) newValue = -5;
        setValue(value.toFixed(1));
    }

    return <>
        <div style={{ height: "60px", display: "flex", alignItems: "center", gap: "5px" }}>
            <button className="spinner-btn" onClick={decrement}>-</button>
            <input
                type="text"
                className="point-input"
                style={{width: "220px", textAlign: "center"}}
                value={value}
                onChange={handleValUpdate}
            />
            <button className="spinner-btn" onClick={increment}>+</button>
        </div>
    </>
}