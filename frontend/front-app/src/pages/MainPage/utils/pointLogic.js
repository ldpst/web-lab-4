import axios from "axios";

export function loadPoints(token, setPoints, setLoading, graphRef) {
    axios.post("http://localhost:8080/api/point/get", { "token": token })
        .then(res => {
            setPoints(res.data.points || []);
            graphRef.current.savePoints(res.data.points || [])
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
}

export async function clearPoints(token) {
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

export async function sendPoint(x, y, r, token, setErrorText) {
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

        if (response.data.isSuccess === "true") {
            console.log("ADD POINT RESPONSE:", response.data);
        } else {
            console.log(response.data);
            setErrorText(response.data.error);
        }
        return response.data;
    } catch (error) {
        console.error("ERROR sending point:", error);
        throw error;
    }
}