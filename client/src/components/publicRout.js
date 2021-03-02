import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {_ChatDoctor} from '../config/path';
//import useAuthContext from '../hooks/useContext'

const PublicRoute = (props) =>{
    const isAutenticated = false;

    if (isAutenticated) {
        return <Redirect to={_ChatDoctor}/>
    }

    return <Route {...props} />
}

export default PublicRoute