import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = () => {
    const { auth } = useAuth();
    return auth?.accessToken ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
