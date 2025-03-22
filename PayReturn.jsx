import { useLocation } from "react-router-dom";

// import { BrowserRouter,Router,Routes } from "react-router-dom";

export default function PayReturn() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");

    return (
        <>
            {status=="success" ? (
                <h1>successed</h1>
            ) : status=="fail"?(
                <h1>Failed</h1>
            ):(<h1>No valid status</h1>)}
        </>
    );
}
