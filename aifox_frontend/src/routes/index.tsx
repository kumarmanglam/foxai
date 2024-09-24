import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import ChatContainer from '../components/core/ChatContainer';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import UsersList from '../pages/User/UsersList';
import AddUser from '../pages/User/AddUser';

import Upload from '../pages/Upload';
import UserDetails from '../pages/User/UserDetails';
import AuthenticatedComponent from '../components/common/AuthenticatedComponent';


const RouterContainer = () => {
    return (<Routes>
        <Route path='/login' element={<Login />} />

        <Route path='/' element={<Layout />} >
            <Route path='/home' element={<AuthenticatedComponent><Home /></AuthenticatedComponent>} />
            <Route path='/addUser' element={<AuthenticatedComponent><AddUser /></AuthenticatedComponent>} />
            <Route path='/userDetails' element={<AuthenticatedComponent><UserDetails /></AuthenticatedComponent>} />
            <Route path='/upload' element={<AuthenticatedComponent><Upload /></AuthenticatedComponent>} />
            <Route path='/usersList' element={<AuthenticatedComponent><UsersList /></AuthenticatedComponent>} />
            <Route path='/foxai' element={<AuthenticatedComponent><ChatContainer /></AuthenticatedComponent>} />
            <Route path='/foxai/:document_id' element={<AuthenticatedComponent><ChatContainer /></AuthenticatedComponent>} />
        </Route>
    </Routes>)

}

export default RouterContainer;