import React, { forwardRef, useImperativeHandle, useEffect, useRef, useState, useMemo } from "react";

const SIZE = 440;
const CENTER = SIZE / 2;

const FIG_COLOR = "#84a98c";

const Graph = forwardRef(({ r, onShoot, updTablePoints, errorText }, ref) => {
    const svgBaseRef = useRef(null);
    const svgOverlayRef = useRef(null);


    const [points, setPoints] = useState(() =>
        JSON.parse(localStorage.getItem("savedPoints") ?? "[]")
    );


    const { R, sign, scale } = useMemo(() => {
        let s = 1;
        let radius;
        if (parseFloat(r)) {
            radius = Math.round(parseFloat(r) * 10) / 10;
            if (radius > 5) radius = 5;
            if (radius < -5) radius = -5;
        } else {
            radius = 1.0;
        }
        if (radius < 0) s = -1;
        const sc = 88 / radius;
        return { R: radius, sign: s, scale: sc };
    }, [r]);

    useImperativeHandle(ref, () => ({
        addPoint,
        savePoints,
        clearPoints
    }));

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

    const axisVals = useMemo(() => [2 * R, R, R / 2, -R / 2, -R, 2 * -R], [R]);

    function toGraphCoords(px, py) {
        const rect = svgOverlayRef.current.getBoundingClientRect();
        const graphRange = R * 2.5;
        const sc = (SIZE / 2) / graphRange;
        return {
            x: (px - SIZE / 2) / sc,
            y: -(py - SIZE / 2) / sc
        };
    }

    function toPixelCoords(x, y) {
        const graphRange = R * 2.5;
        const sc = (SIZE / 2) / graphRange;
        return {
            px: x * sc + SIZE / 2,
            py: -y * sc + SIZE / 2
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
        const { x, y } = toGraphCoords(e.clientX - rect.left, e.clientY - rect.top);
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

        if (onShoot) onShoot(newPoint.x, newPoint.y, newPoint.r);
        if (updTablePoints) setTimeout(() => updTablePoints(), 200);
    }

    function clearPoints() {
        setPoints([]);
        localStorage.removeItem("savedPoints");
    }

    const pointElements = useMemo(() => {
        return points.map((p, i) => {
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
        });
    }, [points, R]);

    return (
        <div style={{ position: "relative", width: SIZE, height: SIZE }}>
            {errorText && <div className="graph-eror" style={{ position:"absolute", margin: 5, padding: "0px 3px", border: "1px solid red" }}>{errorText}</div>}
            <svg ref={svgBaseRef} width={SIZE} height={SIZE} style={{ position: "absolute", top: 0, left: 0 }}>
                <polygon fill={FIG_COLOR} stroke="black"
                    points={`${CENTER},${CENTER} ${CENTER + R * scale / 2},${CENTER} ${CENTER},${CENTER - R * scale}`} />
                <rect x={CENTER - R * scale} y={CENTER - R * scale} width={R * scale} height={R * scale} fill={FIG_COLOR} stroke="black" />
                <defs>
                    <clipPath id="half-circle">
                        <rect x={CENTER - R * scale} y={CENTER} width={R * scale} height={R * scale} />
                    </clipPath>
                </defs>
                <circle cx={CENTER} cy={CENTER} r={R * scale} fill={FIG_COLOR} stroke="black" clipPath="url(#half-circle)" />
                
                <line x1={CENTER} x2={CENTER} y1={0} y2={SIZE} stroke="black" />
                <text x={CENTER + 5} y={15}>y</text>
                <line x1={0} x2={SIZE} y1={CENTER} y2={CENTER} stroke="black" />
                <text x={SIZE - 10} y={CENTER - 5}>x</text>

                {axisVals.map(val => (
                    <g key={`y-${val}`}>
                        <line x1={CENTER - 5} x2={CENTER + 5} y1={CENTER - val * scale} y2={CENTER - val * scale} stroke="black" />
                        <text x={CENTER + 8} y={CENTER - val * scale + 5}>{val}</text>
                    </g>
                ))}

                {axisVals.map(val => (
                    <g key={`x-${val}`}>
                        <line y1={CENTER - 5} y2={CENTER + 5} x1={CENTER + val * scale} x2={CENTER + val * scale} stroke="black" />
                        <text x={CENTER + val * scale - 10} y={CENTER - 8}>{val}</text>
                    </g>
                ))}
            </svg>

            <svg
                ref={svgOverlayRef}
                width={SIZE}
                height={SIZE}
                style={{ position: "absolute", top: 0, left: 0 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                {mousePos && (
                    <>
                        <line x1={mousePos.x} x2={mousePos.x} y1={0} y2={SIZE} stroke="gray" strokeDasharray="4 2" />
                        <line y1={mousePos.y} y2={mousePos.y} x1={0} x2={SIZE} stroke="gray" strokeDasharray="4 2" />
                    </>
                )}
                {pointElements}
            </svg>
        </div>
    );
});

export default Graph;
