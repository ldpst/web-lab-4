import "./Snowflake.css";
import React, { useState, useEffect } from "react";
import snowflakeImg from "../../assets/snowflake.png";

function Snowflake({ size, left, delay, duration }) {
    return (
        <div
            className="snowflake"
            style={{
                width: size,
                height: size,
                left: `${left}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                backgroundImage: `url(${snowflakeImg})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
            }}
        />
    );
}

export default function Snowfall({ count = 50 }) {
    const [flakes, setFlakes] = useState([]);

    useEffect(() => {
        const arr = Array.from({ length: count }, () => ({
            size: `${Math.random() * 10 + 5}px`,
            left: Math.random() * 100,
            delay: Math.random() * 10,
            duration: Math.random() * 10 + 5
        }));
        setFlakes(arr);
    }, [count]);

    return (
        <div className="snow-container">
            {flakes.map((flake, idx) => (
                <Snowflake key={idx} {...flake} />
            ))}
        </div>
    );
}