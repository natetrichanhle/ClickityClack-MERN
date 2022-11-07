import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import Navbar from '../components/Navbar'
import '../static/scss/LoginSignup.css'

const LoginForm = ({ setUser, user }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([])

    const loginUser = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/login",
            JSON.stringify({
                email,
                password,
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                },
                withCredentials: true,
            })
            .then(res => {
                setUser(res.data.user)
                navigate("/");
                console.log(res);
            })
            .catch(err => {
                setErrors(err.response.data.errors)
            })
    }

    // useEffect(() => {
    //     user !== '' && navigate('/')
    // }, [])


    return (
        <div>
            <Navbar user={user} setUser={setUser}/>
            <div className='LoginSignupContainer'>
                <div className='LoginSignupInfoContainer'>
                    <h1 className='LoginSignupFormHeader'>Log In!</h1>
                    <form onSubmit={loginUser} className='LoginSignupForm'>
                        <input
                            type="text"
                            value={email}
                            name="email"
                            placeholder="Email"
                            onChange={e => {setEmail(e.target.value)}}
                            className='LoginSignupFormInput'
                            // required
                        />
                        {errors.email && <p className='err'>{errors.email.message}</p>}
                        <input
                            type="password"
                            value={password}
                            name="password"
                            placeholder="Password"
                            onChange={e => {setPassword(e.target.value)}}
                            className='LoginSignupFormInput'
                            // required
                        />
                        {errors.password && <p className='err'>{errors.password.message}</p>}
                        <input
                            type="submit" placeholder="Log In" className='LoginSignupSubmit'
                        />
                    </form>
                    <Link to="/signup" className='LoginSignupRoute'>
                        Don't have an account? <span className='DarkBlue'>Sign up here.</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginForm