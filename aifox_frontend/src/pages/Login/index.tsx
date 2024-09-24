import React, { useEffect, useRef, useState } from 'react'
import "./style.css"
import fox from "../../assets/icons/fox.png"
import { useDispatch, useSelector } from 'react-redux'
import { selectIsUserLoggedIn } from '../../store/selectors/userSelector'
import { setIsUserLoggedIn, setUserDepartment, setUserEmail } from '../../store/reducers/userSlice'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import { set } from 'mongoose'
import axios from 'axios'
import { callLoginAPI } from '../../services/auth'
export interface loginForm {
    email: string,
    password: string
}
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const btnRef = useRef<HTMLButtonElement>(null);
    const [isLogButtonActive, setIsLogButtonActive] = useState<boolean>(false);

    const [loginForm, SetLoginForm] = useState<loginForm>({
        email: "",
        password: ""
    });

    useEffect(() => {
        const { email, password } = loginForm;
        setIsLogButtonActive(email.trim() !== "" && password.trim() !== "");
    }, [loginForm]);


    useEffect(() => {
        if (btnRef.current) {
            btnRef.current.style.opacity = isLogButtonActive ? '1' : '0.5';
        }
    }, [isLogButtonActive]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        // console.log(loginForm.email);
        // console.log(loginForm.password);


        try {
            const response = await callLoginAPI(loginForm.email, loginForm.password);
            console.log(response.user)
            dispatch(setIsUserLoggedIn(true));
            dispatch(setUserEmail(loginForm.email));
            sessionStorage.setItem("department", response.user.department);
            // dispatch(setUserDepartment(sessionStorage.getItem("department")));
            navigate("/home")

            console.log("response token...", response.token);

            sessionStorage.setItem("token", response.token);

        } catch (err) {
            dispatch(setIsUserLoggedIn(false));

        }

    }

    const handleLogoClick = () => {
        navigate("/admin");
    }

    const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

    return (

        <div className='whole-container'>
            <div className='logo-heading'>
                <img src={fox} alt="fox logo" className='foxLogo' onClick={handleLogoClick} />
                <h1 id='fox-ai-heading'>Fox AI</h1>
            </div>
            <div className="login-container-wrapper">

                <div className='logincontainer'>
                    <div className='login-heading'><h1>Login</h1></div>

                    <form className='formcontainer' onSubmit={handleSubmit}>
                        <div className='fields'>
                            <label className='field-labels'>Email</label><br />
                            <input type="email" id="input" name='email' required value={loginForm?.email} onChange={(e) => {
                                SetLoginForm({ ...loginForm, email: e?.currentTarget?.value });
                            }} />

                        </div>
                        <div className='fields'>
                            <label className='field-labels'>Password</label><br />
                            <input id="input" type='password' name='password' required value={loginForm?.password} onChange={(e) => SetLoginForm({ ...loginForm, password: e?.currentTarget?.value })} />
                        </div>
                        <div id="forgotpwd">
                            <h6>Forgot password?</h6>
                        </div>

                        <div className="login-submit">
                            <button ref={btnRef} id="btn" type='submit' value="Sign in" disabled={!isLogButtonActive}>Submit </button>
                        </div>
                    </form>


                </div>
            </div>
        </div>

    )
}

export default Login;