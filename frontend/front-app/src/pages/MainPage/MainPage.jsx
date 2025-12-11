import "./MainPage.css";
import {useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../utils/AuthContext";
import Graph from "./components/Graph";
import Advertisement from "./components/Advertisement";
import { XInputField, YInputField, RInputField, InputButtons } from "./components/InputFields";
import { loadPoints, sendPoint } from "./utils/pointLogic";
import { shuffleAds } from "./utils/advShuffler";
import DataTablePage from "./components/DataTablePage"

function MainPage() {
    const authContext = useContext(AuthContext);
    const [points, setPoints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorText, setErrorText] = useState(null);

    useEffect(() => {
        if (!errorText) return;

        const timer = setTimeout(() => {
            setErrorText(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [errorText]);

    const graphRef = useRef(null);

    const [isPad, setIsPad] = useState(window.innerWidth < 890);
    
    useEffect(() => {
        const handleResize = () => setIsPad(window.innerWidth < 890);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [xValue, setXValue] = useState(0);
    const [xError, setXError] = useState("");

    const [yValue, setYValue] = useState(0);
    const [yError, setYError] = useState("");

    const [rValue, setRValue] = useState(1);
    const [rError, setRError] = useState("");

    const loadAllPoints = () => {
        loadPoints(authContext.token, setPoints, setLoading, graphRef);
    };

    useEffect(() => {
        loadAllPoints();
    }, []);

    const [leftAds, setLeftAds] = useState([]);
    const [rightAds, setRightAds] = useState([]);

    useEffect(() => {
        shuffleAds(setLeftAds, setRightAds);
    }, []);

    return <>
        <div className="layout">
            <div className="left-div">
                {!isPad && leftAds.map((ad, i) => (
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
                        <XInputField 
                            xValue={xValue}
                            setXValue={setXValue}
                            xError={xError}
                            setXError={setXError}
                        />
                        <YInputField
                            yValue={yValue}
                            setYValue={setYValue}
                            yError={yError}
                            setYError={setYError}
                        />
                        <RInputField
                            rValue={rValue}
                            setRValue={setRValue}
                            rError={rError}
                            setRError={setRError}
                        />
                        <InputButtons
                            xValue={xValue}
                            yValue={yValue}
                            xError={xError}
                            yError={yError}
                            rError={rError}
                            graphRef={graphRef}
                            token={authContext.token}
                            loadAllPoints={loadAllPoints}
                        />
                    </div>
                    <div className="adver-div">
                        {isPad && leftAds.map((ad, i) => (
                            <Advertisement
                                key={i}
                                imgSrc={ad.imgSrc}
                                details={ad.details}
                                btnLink={ad.btnLink}
                            />
                        ))}
                    </div>
                    <div id="graph-container" className="input-div center-wrapper">
                        <Graph 
                            ref={graphRef}
                            r={rValue} 
                            onShoot={(x, y, r) => sendPoint(x, y, r, authContext.token, setErrorText)}
                            updTablePoints={() => loadAllPoints()}
                            errorText={errorText}
                        />
                    </div>
                    <div className="adver-div">
                        {isPad && rightAds.map((ad, i) => (
                                <Advertisement
                                    key={i}
                                    imgSrc={ad.imgSrc}
                                    details={ad.details}
                                    btnLink={ad.btnLink}
                                />
                        ))}
                    </div>
                </div>
                <div className="bottom-div">
                    <DataTablePage
                        data={points}
                        loading={loading}
                        reload={loadAllPoints}
                        authContext={authContext}
                    />
                </div>
            </div>

            <div className="right-div">
                {!isPad && rightAds.map((ad, i) => (
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

export default MainPage;
