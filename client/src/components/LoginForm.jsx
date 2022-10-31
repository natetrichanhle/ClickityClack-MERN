import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import Navbar from '../components/Navbar'
import styles from '../static/css/LoginSignup.module.css'

const LoginForm = ({ setUser, user }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

    const emailErr = 'Email is required'
    const passwordErr = 'Password is required'

    const handleEmail = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        if(!newEmail){
            setEmailValid(false);
        } else {
            setEmailValid(true);
        }
    }

    const handlePassword = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if(!newPassword){
            setPasswordValid(false);
        } else {
            setPasswordValid(true);
        }
    }

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

    useEffect(() => {
        user !== '' && navigate('/')
    }, [])


    return (
        <div>
            <Navbar user={user} setUser={setUser}/>
            <div className={styles.container}>
                <div className={styles.infoContainer}>
                    <h1 className={styles.formHeader}>Log In!</h1>
                    <form onSubmit={loginUser} className={styles.form}>
                        <input
                            type="text"
                            value={email}
                            name="email"
                            placeholder="Email"
                            onChange={handleEmail}
                            className={styles.formInput}
                            required
                        />
                        {!emailValid && <p className={styles.err}>{emailErr}</p>}
                        <input
                            type="password"
                            value={password}
                            name="password"
                            placeholder="Password"
                            onChange={handlePassword}
                            className={styles.formInput}
                            required
                        />
                        {!passwordValid && <p className={styles.err}>{passwordErr}</p>}
                        <input
                            type="submit" placeholder="Log In" className={styles.submit}
                        />
                    </form>
                    <Link to="/signup" className={styles.route}>
                        Don't have an account? Sign up here.
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginForm