import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {_login} from '../config/path';
import useAuthContext from '../hooks/useAuthContext';
const PrivateRoute = (props) => {
    const {isAutenticated} = useAuthContext();

    if (!isAutenticated) {
        return <Redirect to={_login}/>;
    }

    return <Route {...props} />;
}

export default PrivateRoute