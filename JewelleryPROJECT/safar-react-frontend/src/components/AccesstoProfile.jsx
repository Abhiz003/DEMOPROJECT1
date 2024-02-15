import { Navigate } from "react-router-dom";
import { isBlogger } from "../utils/TokenUtil";

export function AccessProfile(props) {
    if (!isBlogger()) {
        return <Navigate to={'/user-profile'}></Navigate>; 
    }
    return <Navigate to={'/blogger-profile'}></Navigate>; 
}