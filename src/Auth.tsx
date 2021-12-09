import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import LocalStorageService from "./services/LocalStorageServices";

const Auth = () => {
    const token = LocalStorageService.getAccessToken()
    let location = useLocation();

    if(token){
        return <Outlet />
    } else {
        return <Navigate to="/login" state={{ from: location }} />
    }
}

export default Auth

