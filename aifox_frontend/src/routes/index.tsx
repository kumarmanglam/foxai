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


const RouterContainer = () => {
    return (<Routes>
        <Route path='/login' element={<Login />} />

        <Route path='/' element={<Layout />} >
            <Route path='/home' element={<Home />} />
            <Route path='/addUser' element={<AddUser />} />
            <Route path='/userDetails' element={<UserDetails />} />
            {/* <Route path='/user' element={<UserHome />} /> */}
            <Route path='/upload' element={<Upload />} />
            <Route path='/usersList' element={<UsersList />} />
            <Route path='/foxai' element={<ChatContainer />} />
            <Route path='/foxai/:document_id' element={<ChatContainer />} />
        </Route>
    </Routes>)

}

export default RouterContainer;