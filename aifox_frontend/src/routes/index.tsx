import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import ChatContainer from '../components/core/ChatContainer';
import Layout from '../components/Layout';
import Home from '../pages/Home/AdminHome';
import User from '../pages/User/AddUser';
import UsersList from '../pages/User/UsersList';
import AddUser from '../pages/User/AddUser';
import AdminHome from '../pages/Home/AdminHome';
import UserHome from '../pages/Home/UserHome';
import Upload from '../pages/Upload';
import UserDetails from '../pages/User/UserDetails';


const RouterContainer = () => {
    return (<Routes>
        <Route path='/login' element={<Login />} />

        <Route path='/' element={<Layout />} >
            <Route path='/admin' element={<AdminHome />} />
            <Route path='/addUser' element={<AddUser />} />
            <Route path='/userDetails' element={<UserDetails />} />
            <Route path='/user' element={<UserHome />} />
            <Route path='/upload' element={<Upload />} />
            <Route path='/usersList' element={<UsersList />} />
            <Route path='/foxai' element={<ChatContainer />} />
        </Route>
    </Routes>)

}

export default RouterContainer;