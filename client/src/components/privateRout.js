import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {_SignIn} from '../config/path';
import useAuthContext from '../hooks/useAuthContext';

const PrivateRoute = (props) => {
    const {isAutenticated} = useAuthContext();

    if (!isAutenticated) {
        return <Redirect to={_SignIn}/>;
    }

    return <Route {...props} />;
}

export default PrivateRoute