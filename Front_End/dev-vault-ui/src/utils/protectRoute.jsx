import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoutes = ()=>{
    const token = sessionStorage.getItem("jwt_token") || null

     return token ? <Outlet/> : <Navigate to='/login'/>
}