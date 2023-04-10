import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Dashboard from '../features/user/Dashboard';

export const PrivateRoute = (props) => {
    return localStorage.getItem('token') ? props.children : <Navigate to={{ pathname: '/login', state: { from: props.location } }} />;
}