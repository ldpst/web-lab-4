export default function DataTablePage({ data, loading, reload, authContext }) {

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