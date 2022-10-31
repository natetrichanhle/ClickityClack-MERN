import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import FileBase64 from 'react-file-base64';

import styles from '../static/css/LoginSignup.module.css'

const SignupForm = ({ registerUser, page, user }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatar, setAvatar] = useState('');

    const [usernameValid, setUsernameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);

    const usernameErr = 'Username is required'
    const emailErr = 'Email is required'
    const passwordErr = 'Password is required'
    const confirmPasswordErr = 'Passwords must match'

    const handleUsername = (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername);

        if(!newUsername){
            setUsernameValid(false);
        } else {
            setUsernameValid(true);
        }
    }

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

    const handleConfirmPassword = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);

        if(!newConfirmPassword){
            setConfirmPasswordValid(false);
        } else {
            setConfirmPasswordValid(true);
        }
    }


    useEffect(() => {
        if (page === 'Update User!') {
            setUsername(user.username)
            setEmail(user.email)
            setPassword(user.password)
            setAvatar(user.avatar)
        }
        else {
            return
        }
    }, [])

    const onSubmitHandler = e => {
        e.preventDefault();
        registerUser(username, email, avatar, password, confirmPassword);
    }

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.infoContainer}>
                    <h1 className={styles.formHeader}>{page}</h1>
                    <form onSubmit={onSubmitHandler} className={styles.form}>
                        <div className={styles.formInput}>
                            <label>Profile Picture</label>
                            <FileBase64
                                multiple={false}
                                value={avatar}
                                onDone={({ base64 }) => setAvatar(base64)} 
                                required
                                />
                        </div>
                        <input
                            type="text"
                            value={username}
                            name="username"
                            placeholder="Username"
                            onChange={handleUsername}
                            className={styles.formInput}
                            required
                        />
                        {!usernameValid && <p className={styles.err}>{usernameErr}</p>}
                        <input
                            type="email"
                            value={email}
                            name="email"
                            placeholder="Email"
                            onChange={handleEmail}
                            className={styles.formInput}
                            required
                        />
                        {!emailValid && <p className={styles.err}>{emailErr}</p>}
                        {page === 'Sign Up!' &&
                            <>
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
                                    type="password"
                                    value={confirmPassword}
                                    name=""
                                    placeholder="Confirm Password"
                                    onChange={handleConfirmPassword}
                                    className={styles.formInput}
                                    required
                                />
                                {!confirmPasswordValid && <p className={styles.err}>{confirmPasswordErr}</p>}
                            </>
                        }
                        <input
                            type="submit" placeholder="Log In" className={styles.submit}
                        />
                    </form>
                    {page === 'Sign Up!' &&
                        <>
                            <Link to="/login" className={styles.route}>
                                Have an account already? <span className={styles.blue}>Log in here.</span>
                            </Link>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default SignupForm