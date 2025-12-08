import axios from "axios";
import "./MainPage.css";
import {useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../utils/AuthContext";
import Graph from "../components/Graph";
import Decimal from "decimal.js";
import macanImg from '../../assets/macan.png';
import elenaImg from '../../assets/elena.jpg';
import babyImg from '../../assets/baby.png';
import donorImg from '../../assets/donor.png';
import wifeImg from '../../assets/wife.png';
import pergImg from '../../assets/perg.png';
import Advertisement from "../components/advertisement";

function MainPage() {
    const authContext = useContext(AuthContext);
    const [points, setPoints] = useState([]);
    const [loading, setLoading] = useState(true);

    const graphRef = useRef(null);

    const [xValue, setXValue] = useState(0);
    const [xError, setXError] = useState("");
    const handleXUpdate = (e) => {
        const val = e.target.value;
        setXValue(val);

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

    const [yValue, setYValue] = useState(0);
    const [yError, setYError] = useState("");
    const handleYUpdate = (e) => {
        const val = e.target.value;
        setYValue(val);

        checkY(val);
    }

    function checkY(val) {
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

    const increment = () => {
        let newValue = parseFloat(yValue) + 0.1;
        if (newValue > 3) newValue = 3;
        setYValue(newValue.toFixed(1));
    }
    const decrement = () => {
        let newValue = parseFloat(yValue) - 0.1;
        if (newValue < -5) newValue = -5;
        setYValue(newValue.toFixed(1));
    }
    const [rValue, setRValue] = useState(1);
    const [rError, setRError] = useState("");
    const handleRUpdate = (e) => {
        const val = e.target.value;
        setRValue(val);

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

    const handleSendClick = async () => {
        if (xError === "" && yError === "" && rError === "") {
            graphRef.current.addPoint(xValue, yValue);
            loadPoints();
        }
    };

    const loadPoints = () => {
        axios.post("http://localhost:8080/api/point/get", { "token": authContext.token })
            .then(res => {
                setPoints(res.data.points || []);
                graphRef.current.savePoints(res.data.points || [])
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadPoints();
    }, []);
    
    const ads = [
        { imgSrc: macanImg, details: "Военная служба по контракту. Выплаты до ₽1 млн. в месяц", btnLink: "https://itmo.ru" },
        { imgSrc: elenaImg, details: "Елена 400 метров от вас", btnLink: "https://my.itmo.ru/persons" },
        { imgSrc: babyImg, details: "Роды в Панаме с комфортом. Узнать подробнее", btnLink: "https://my.itmo.ru/requests/new/2786" },
        { imgSrc: donorImg, details: "Хотите стать донором яйцеклеток? Записаться сейчас", btnLink: "https://se.ifmo.ru/courses/web#labs" },
        { imgSrc: wifeImg, details: "Вернуть жену реально. Бывшая сама захочет вернуться", btnLink: "https://burgerkingrus.ru" },
        { imgSrc: pergImg, details: "Беременность по натальной карте. Узнать точные даты", btnLink: "https://www.random.org/" }
    ];

    function shuffle(array) {
        return array
            .map(v => ({ v, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(el => el.v);
    }

    const [leftAds, setLeftAds] = useState([]);
    const [rightAds, setRightAds] = useState([]);

    useEffect(() => {
        const shuffled = shuffle(ads);
        const half = Math.ceil(shuffled.length / 2);

        setLeftAds(shuffled.slice(0, half));
        setRightAds(shuffled.slice(half));
    }, []);

    return <>
        <div className="layout">
            <div className="left-div">
                {leftAds.map((ad, i) => (
                    <Advertisement
                        key={i}
                        imgSrc={ad.imgSrc}
                        details={ad.details}
                        btnLink={ad.btnLink}
                    />
                ))}
            </div>

            <div className="main-div">
                <div className="top-div">
                    <div className="input-div center-wrapper vertical-direction" id="xyr-inputs">
                        <div className="point-input-field">
                            <div className="point-input-top">
                                <span>X:</span>
                                {xError && <div className="input-error-div">{xError}</div>}
                            </div>
                            <input className="point-input"
                                type="text"
                                value={xValue}
                                onChange={handleXUpdate}
                            />
                        </div>
                        <div className="point-input-field">
                            <div className="point-input-top">
                                <span>Y:</span>
                                {yError && <div className="input-error-div">{yError}</div>}
                            </div>
                            <div style={{ height: "60px", display: "flex", alignItems: "center", gap: "5px" }}>
                                <button className="spinner-btn" onClick={decrement}>-</button>
                                    <input
                                        type="text"
                                        className="point-input"
                                        style={{width: "220px", textAlign: "center"}}
                                        value={yValue}
                                        onChange={handleYUpdate}
                                    />
                                <button className="spinner-btn" onClick={increment}>+</button>
                            </div>
                        </div>
                        <div className="point-input-field">
                            <div className="point-input-top">
                                <span>R:</span>
                                {rError && <div className="input-error-div">{rError}</div>}
                            </div>
                            <input className="point-input"
                                type="text"
                                value={rValue}
                                onChange={handleRUpdate}
                            />
                        </div>
                        <div className="point-input-btns">
                            <button className="point-input-btn"
                                onClick={handleSendClick}
                            >SEND</button>
                            <button
                                className="point-input-btn"
                                onClick={() => {
                                    if (clearPoints(authContext.token)) {
                                        graphRef.current.clearPoints();
                                    }
                                    setTimeout(loadPoints, 200);
                                }}
                            >CLEAR</button>
                        </div>
                    </div>
                    <div id="graph-container" className="input-div center-wrapper">
                        <Graph 
                            ref={graphRef}
                            r={rValue} 
                            onShoot={(x, y, r) => sendPoint(x, y, r, authContext.token)}
                            updTablePoints={() => loadPoints()}
                        />
                    </div>
                </div>
                <div className="bottom-div">
                    <DataTablePage
                        data={points}
                        loading={loading}
                        reload={loadPoints}
                    />
                </div>
            </div>

            <div className="right-div">
                {rightAds.map((ad, i) => (
                    <Advertisement
                        key={i}
                        imgSrc={ad.imgSrc}
                        details={ad.details}
                        btnLink={ad.btnLink}
                    />
                ))}
            </div>
        </div>
    </>
};

async function clearPoints(token) {
    return await axios.post("http://localhost:8080/api/point/clear", {
        "token": token
    })
    .then(res => { if(res.data.isSuccess === "true") {
            return true;
        } else {
            return false;
        }
    })
    .catch(err => {
        console.error(err);
        return false;
    });
}

async function sendPoint(x, y, r, token) {
    try {
        const response = await axios.post(
            "http://localhost:8080/api/point/add",
            {
                x: x,
                y: y,
                r: r,
                token: token
            }
        );

        console.log("ADD POINT RESPONSE:", response.data);
        return response.data;
    } catch (error) {
        console.error("ERROR sending point:", error);
        throw error;
    }
}
    
function DataTablePage({ data, loading, reload }) {
        const authContext = useContext(AuthContext);

        const logoutFunc = () => {
            authContext.logout();
            localStorage.removeItem("savedPoints");
            window.open("http://localhost:3001/auth", "_self");
        }

        return (
            <div className="page-container">
                {authContext.user.email && <div className="account-div">
                    <span>{authContext.user.email}</span>
                    <button id="logout-btn" onClick={logoutFunc}>logout</button>
                </div>}

                <h1 className="page-title">Table of points</h1>

                {loading && <p className="loading">Loading...</p>}

                {!loading && data.length === 0 && (
                    <p className="no-data">No data available</p>
                )}
                
                {!loading && (
                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                            <tr>
                                {data.length > 0 &&
                                    Object.keys(data[0]).map(k => <th key={k}>{k}</th>)}
                            </tr>
                            </thead>
                            <tbody>
                            {data.slice().reverse().map((row, i) => (
                                <tr key={i}>
                                    {Object.values(row).map((val, j) =>
                                        <td key={j}>{String(val)}</td>
                                    )}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        )
    }

export default MainPage;
