import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {_ChatDoctor, _ChatPatient} from '../config/path';
import useAuthContext from '../hooks/useAuthContext';

const PublicRoute = (props) =>{
    const {isAutenticated} = useAuthContext();

    if (isAutenticated) {
        return <Redirect to={_ChatDoctor}/>
    }

    return <Route {...props} />
}

export default PublicRoute