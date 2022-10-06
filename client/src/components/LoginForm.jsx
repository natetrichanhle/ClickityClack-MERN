import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import Navbar from '../components/Navbar'
import styles from '../static/css/LoginSignup.module.css'

const LoginForm = ({ setUser, user }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/login",
            JSON.stringify({
                email,
                password,
            }),
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            .then(res => {
                setUser(res.data.user)
                navigate("/");
                console.log(res);
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Navbar user={user}/>
            <div className={styles.container}>
                <h1 className={styles.formHeader}>Log In!</h1>
                <form onSubmit={loginUser} className={styles.form}>
                    <input
                        type="text"
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
                        type="submit" placeholder="Log In" className={styles.submit}
                    />
                </form>
                <Link to="/signup" className={styles.route}>
                    Don't have an account? Sign up here.
                </Link>
            </div>
        </div>
    )
}

export default LoginForm