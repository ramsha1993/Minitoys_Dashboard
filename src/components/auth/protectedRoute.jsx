// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
    const token = Cookies.get("authToken");

    if (!token) {
        return <Navigate to="/signin" replace />; // ✅ Component, not function
    }

    return children;
};

export default ProtectedRoute;