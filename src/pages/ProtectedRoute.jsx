import { Navigate } from "react-router-dom";
import auth from "../services/auth";

export const ProtectedRoute = ({ children }) => {
    if (!auth.userData()) {
        return <Navigate to="/login" />;
    }
    return children;
};