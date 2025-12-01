import "./MainPage.css";
import {useState, useEffect, useContext, useNavigate} from "react";

function MainPage() {
    return <>
        <div className="center-wrapper fullsize">
            <div className="main-div">
                <div className="top-div">
                    <div className="input-div center-wrapper">
                        zxc
                    </div>
                    <div id="graph-container" className="center-wrapper" data-r="2" layout="block">
                        zxc1
                        {/* <svg id="graph-svg" style="width: 100%; height: 100%"></svg>
                        <svg id="overlay-svg" style="width: 100%; height: 100%"></svg> */}
                    </div>
                </div>
                <div className="bottom-div">
                    {DataTablePage()}
                </div>
            </div>
        </div>
    </>
};

function DataTablePage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
    fetch("/api/data") // замените на ваш URL
    .then((res) => {
    if (!res.ok) throw new Error("Ошибка запроса");
    return res.json();
    })
    .then((json) => setData(json))
    .catch((e) => setError(e.message))
    .finally(() => setLoading(false));
    }, []);


    return (
    <div className="page-container">
        <h1 className="page-title">Таблица данных</h1>


        {loading && <p className="loading">Загрузка...</p>}
        {error && <p className="error">{error}</p>}


        {!loading && !error && (
        <div className="table-wrapper">
        <table className="data-table">
        <thead>
        <tr>
        {data.length > 0 &&
        Object.keys(data[0]).map((key) => (
        <th key={key}>{key}</th>
        ))}
        </tr>
        </thead>
        <tbody>
        {data.map((row, idx) => (
        <tr key={idx} className={idx % 2 === 0 ? "row-even" : "row-odd"}>
        {Object.values(row).map((value, i) => (
        <td key={i}>{String(value)}</td>
        ))}
        </tr>
        ))}
        </tbody>
        </table>
        </div>
        )}
    </div>
    );
}

export default MainPage;