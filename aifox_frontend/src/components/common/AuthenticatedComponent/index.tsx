import React from 'react'
import { useSelector } from 'react-redux';
import { selectIsUserLoggedIn } from '../../../store/selectors/userSelector';
import { Navigate } from 'react-router-dom';

interface AuthenticatedComponentProp {
    children: any;
}
const AuthenticatedComponent: React.FC<AuthenticatedComponentProp> = ({ children }) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        return children;
    }
    return (
        <Navigate to="/login" />
    )
}

export default AuthenticatedComponent;