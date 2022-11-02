import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import SignupForm from '../components/SignupForm';
import Navbar from '../components/Navbar';

const Signup = ({user, setUser}) => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const registerUser = (username, email, password, avatar, confirmPassword) => {
        axios.post("http://localhost:8000/api/register",
            JSON.stringify({
                username,
                email,
                password,
                avatar,
                confirmPassword
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
                navigate("/login");
            })
            .catch(err => {
                console.log(err.response.data.errors)
                setErrors(err.response.data.errors)
            })
    }

    return (
        <div>
            <Navbar user={user} setUser={setUser}/>
            <SignupForm 
                user={user}
                registerUser={registerUser}
                page={'Sign Up!'}
                errors={errors}
            />
        </div>
    )
}

export default Signup