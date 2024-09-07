import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import ChatContainer from '../components/core/ChatContainer';
import Layout from '../components/Layout';
import AuthenticatedComponent from '../components/common/AuthenticatedComponent';


const RouterContainer = () => {
    return (<Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Layout />} >
            <Route path='/foxai' element={
                <AuthenticatedComponent>
                    <ChatContainer />
                </AuthenticatedComponent>
            } />
        </Route>
    </Routes>)

}

export default RouterContainer;