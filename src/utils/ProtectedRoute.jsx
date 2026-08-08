import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    const isLogin = localStorage.getItem("isLogin");

    if (isLogin !== "true") {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;