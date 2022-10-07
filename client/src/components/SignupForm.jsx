import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

import Navbar from '../components/Navbar'
import styles from '../static/css/LoginSignup.module.css'

const SignupForm = ({ setUser, user }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const registerUser = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/register",
            JSON.stringify({
                username,
                email,
                password,
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
            <Navbar user={user}/>
            <div className={styles.container}>
                <div className={styles.infoContainer}>
                    <h1 className={styles.formHeader}>Sign Up!</h1>
                    <form onSubmit={registerUser} className={styles.form}>
                        <input
                            type="text"
                            value={username}
                            name="username"
                            placeholder="Username"
                            onChange={(e) => { setUsername(e.target.value) }}
                            className={styles.formInput}
                        />
                        <input
                            type="email"
                            value={email}
                            name="email"
                            placeholder="Email"
                            onChange={(e) => { setEmail(e.target.value) }}
                            className={styles.formInput}
                        />
                        <input
                            type="password"
                            value={password}
                            name="password"
                            placeholder="Password"
                            onChange={(e) => { setPassword(e.target.value) }}
                            className={styles.formInput}
                        />
                        <input
                            type="password"
                            value={confirmPassword}
                            name=""
                            placeholder="Confirm Password"
                            onChange={(e) => { setConfirmPassword(e.target.value) }}
                            className={styles.formInput}
                        />
                        <input
                            type="submit" placeholder="Log In" className={styles.submit}
                        />
                    </form>
                    <Link to="/login" className={styles.route}>
                        Have an account already? <span className={styles.blue}>Log in here.</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignupForm