import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import LocalStorageService from "./services/LocalStorageServices";

const Auth = () => {
    console.log('hello')
    const token = LocalStorageService.getAccessToken()
    console.log(token)
    let location = useLocation();

    if(token){
        return <Outlet />
    } else {
        return <Navigate to="/login" state={{ from: location }} />
    }
}

export default Auth

