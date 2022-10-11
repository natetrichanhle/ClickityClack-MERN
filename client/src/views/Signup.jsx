import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import SignupForm from '../components/SignupForm';
import Navbar from '../components/Navbar';

const Signup = ({user, setUser}) => {
    const navigate = useNavigate();

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
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            .then(res => {
                setUser(res.data.user)
                navigate("/login");
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Navbar user={user} />
            <SignupForm 
                user={user}
                registerUser={registerUser}
                page={'Sign Up!'}
            />
        </div>
    )
}

export default Signup