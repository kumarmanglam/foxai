import React from 'react'
import { useSelector } from 'react-redux';
import { selectIsUserLoggedIn } from '../../../store/selectors/userSelector';
import { Navigate } from 'react-router-dom';

interface AuthenticatedComponentProp {
    children: any;
}
const AuthenticatedComponent: React.FC<AuthenticatedComponentProp> = ({ children }) => {
    const isAuthenticated = useSelector(selectIsUserLoggedIn);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default AuthenticatedComponent;