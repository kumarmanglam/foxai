import React from 'react'
import fox from "../../../assets/icons/fox.png"
import "./style.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setIsUserLoggedIn } from '../../../store/reducers/userSlice'
const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <div className='entireLayout'>
            <div className='navLogo'>
                <img src={fox} alt='foxai-logo' id="fox-ai-logo" />
                <p id="fox-ai-heading">Fox AI</p>
            </div>
            <div className='home-logout'>
                <button id='navHomeButton' className="actionButton" onClick={() => navigate("/foxai")}>Home</button>
                <button id='navLogoutButton' className="actionButton" onClick={() => {
                    navigate("/login");
                    dispatch(setIsUserLoggedIn(false));
                }}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar;