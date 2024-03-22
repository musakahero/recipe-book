import {Navigate} from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export const Logout = () => {
    const { onLogoutClick, token } = useContext(AuthContext);
    
    useEffect( () => {
        console.log('token provided is ', token);
        onLogoutClick(token);
    }, [onLogoutClick, token]);
    
    return <Navigate to="/" />
}