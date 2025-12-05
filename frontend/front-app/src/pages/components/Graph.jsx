import React, { forwardRef, useImperativeHandle, useEffect, useRef, useState } from "react";

const Graph = forwardRef(({ r, onShoot, updTablePoints }, ref) => {
    const svgBaseRef = useRef(null);
    const svgOverlayRef = useRef(null);

    const figColor = "#84a98c";

    useImperativeHandle(ref, () => ({
        addPoint,
        savePoints,
        clearPoints
    }));

    const [points, setPoints] = useState(() =>
        JSON.parse(localStorage.getItem("savedPoints") ?? "[]")
    );

    const size = 440;
    const center = size / 2;
    let sign = 1;
    let R;
    if (parseFloat(r)) {
        R = Math.round(parseFloat(r) * 10) / 10;
        if (R > 5) {
            R = 5;
        }
        if (R < -5) {
            R = -5;
        }
    } else {
        R = 1.0;
    }
    if (R < 0) {
        sign = -1;
    }
    const scale = 88 / R;

    function savePoints(newPts) {
        setPoints(newPts);
        localStorage.setItem("savedPoints", JSON.stringify(newPts));
    }

    const calcShoot = (x, y, r) => {
        x *= sign; y *= sign; r *= sign;
        const isTriangle = x >= 0 && x <= r / 2 && y >= 0 && y <= -x * 2 + r;
        const isRectangle = x <= 0 && x >= -r && y >= 0 && y <= r;
        const isCircle = x <= 0 && y <= 0 && x * x + y * y <= r ** 2;
        return isTriangle || isRectangle || isCircle;
    };

    function toGraphCoords(px, py) {
        const rect = svgOverlayRef.current.getBoundingClientRect();

        const graphRange = R * 2.5;
        const scale = (size / 2) / graphRange;

        const cx = size / 2;
        const cy = size / 2;

        const x = (px - cx) / scale;
        const y = -(py - cy) / scale;

        return { x, y };
    }

    function toPixelCoords(x, y) {
        const graphRange = R * 2.5;
        const scale = (size / 2) / graphRange;

        const cx = size / 2;
        const cy = size / 2;

        return {
            px: x * scale + cx,
            py: -y * scale + cy
        };
    }

    const [mousePos, setMousePos] = useState(null);

    function handleMouseMove(e) {
        const rect = svgOverlayRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }

    function handleMouseLeave() {
        setMousePos(null);
    }

    function handleClick(e) {
        const rect = svgOverlayRef.current.getBoundingClientRect();
        let px = e.clientX - rect.left;
        let py = e.clientY - rect.top;

        const { x, y } = toGraphCoords(px, py);
    
        addPoint(x, y);
    }

    function addPoint(x1, y1) {
        const x = parseFloat(x1);
        const y = parseFloat(y1);
        const newPoint = {
            x: +x.toFixed(3),
            y: +y.toFixed(3),
            r: R,
            timestamp: new Date().toISOString()
        };

        const updated = [...points, newPoint];
        savePoints(updated);

        if (onShoot) {
            onShoot(newPoint.x, newPoint.y, newPoint.r);
        }

        if (updTablePoints) {
            setTimeout(() => {
                updTablePoints();
            }, 200);
        }
    }

    function clearPoints() {
        setPoints([]);
        localStorage.removeItem("savedPoints");
    }

    return (
        <div style={{ position: "relative", width: size, height: size }}>

            <svg
                ref={svgBaseRef}
                width={size}
                height={size}
                style={{ position: "absolute", top: 0, left: 0 }}
            >

                <polygon
                    fill={figColor}
                    stroke="black"
                    points={`${center},${center} ${center + R * scale / 2},${center} ${center},${center - R * scale}`}
                />
                <rect
                    x={center - R * scale}
                    y={center - R * scale}
                    width={R * scale}
                    height={R * scale}
                    fill={figColor}
                    stroke="black"
                />
                <defs>
                    <clipPath id="half-circle">
                        <rect
                            x={center - R * scale}
                            y={center}
                            width={R * scale}
                            height={R * scale}
                        />
                    </clipPath>
                </defs>
                <circle
                    cx={center}
                    cy={center}
                    r={R * scale}
                    fill={figColor}
                    stroke="black"
                    clipPath="url(#half-circle)"
                />

                <line x1={center} x2={center} y1={0} y2={size} stroke="black" />
                <text x={center + 5} y={15}>y</text>

                <line x1={0} x2={size} y1={center} y2={center} stroke="black" />
                <text x={size - 10} y={center - 5}>x</text>

                {[2 * R, R, R / 2, -R / 2, -R, 2 * -R].map(val => (
                    <g key={val}>
                        <line
                            x1={center - 5}
                            x2={center + 5}
                            y1={center - val * scale}
                            y2={center - val * scale}
                            stroke="black"
                        />
                        <text x={center + 8} y={center - val * scale + 5}>
                            {val}
                        </text>
                    </g>
                ))}

                {[2 * R, R, R / 2, -R / 2, -R, 2 * -R].map(val => (
                    <g key={val}>
                        <line
                            y1={center - 5}
                            y2={center + 5}
                            x1={center + val * scale}
                            x2={center + val * scale}
                            stroke="black"
                        />
                        <text
                            x={center + val * scale - 10}
                            y={center - 8}
                        >
                            {val}
                        </text>
                    </g>
                ))}
            </svg>

            <svg
                ref={svgOverlayRef}
                width={size}
                height={size}
                style={{ position: "absolute", top: 0, left: 0 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                {mousePos && (
                    <>
                        <line
                            x1={mousePos.x}
                            x2={mousePos.x}
                            y1={0}
                            y2={size}
                            stroke="gray"
                            strokeDasharray="4 2"
                        />
                        <line
                            y1={mousePos.y}
                            y2={mousePos.y}
                            x1={0}
                            x2={size}
                            stroke="gray"
                            strokeDasharray="4 2"
                        />
                    </>
                )}

                {points.map((p, i) => {
                    const { px, py } = toPixelCoords(p.x, p.y);
                    return (
                        <circle
                            key={i}
                            cx={px}
                            cy={py}
                            r={4}
                            fill={calcShoot(p.x, p.y, R) ? "green" : "red"}
                        />
                    );
                })}
            </svg>
        </div>
    );
})
export default Graph;