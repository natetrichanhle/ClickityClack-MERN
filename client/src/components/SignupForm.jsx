import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FileBase64 from 'react-file-base64';

import '../static/scss/LoginSignup.css'

const SignupForm = ({ registerUser, page, user, errors }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatar, setAvatar] = useState('');

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
            <div className='LoginSignupContainer'>
                <div className='LoginSignupInfoContainer'>
                    <h1 className='LoginSignupFormHeader'>{page}</h1>
                    <form onSubmit={onSubmitHandler} className='LoginSignupForm'>
                        <div className='LoginSignupFormInput'>
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
                            onChange={e => {setUsername(e.target.value)}}
                            className='LoginSignupFormInput'
                            // required
                        />
                        {/* {errors.username && <p className='err'>{errors.username.message}</p>} */}
                        <input
                            type="email"
                            value={email}
                            name="email"
                            placeholder="Email"
                            onChange={e => {setEmail(e.target.value)}}
                            className='LoginSignupFormInput'
                            // required
                        />
                        {/* {errors.email && <p className='err'>{errors.email.message}</p>} */}
                        {page === 'Sign Up!' &&
                            <>
                                <input
                                    type="password"
                                    value={password}
                                    name="password"
                                    placeholder="Password"
                                    onChange={e => {setPassword(e.target.value)}}
                                    className='LoginSignupFormInput'
                                    // required
                                />
                                {/* {errors.password && <p className='err'>{errors.password.message}</p>} */}
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    name=""
                                    placeholder="Confirm Password"
                                    onChange={e => {setConfirmPassword(e.target.value)}}
                                    className='LoginSignupFormInput'
                                    // required
                                />
                                {/* {errors.confirmPassword && <p className='err'>{errors.confirmPassword.message}</p>} */}
                            </>
                        }
                        <input
                            type="submit" placeholder="Sign Up" className='LoginSignupSubmit'
                        />
                    </form>
                    {page === 'Sign Up!' &&
                        <>
                            <Link to="/login" className='LoginSignupRoute'>
                                Have an account already? <span className='DarkBlue'>Log in here.</span>
                            </Link>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default SignupForm