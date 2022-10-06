import React from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

import styles from '../static/css/Navbar.module.css'
import logo from "../static/images/Logo.png"

const Navbar = ({user}) => {
    const navigate = useNavigate();

    const logout = () => {
        axios.get("http://localhost:8000/api/logout", {withCredentials: true})
            .then(res => {
                navigate("/login");
                window.location.reload()
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.container}>
            <Link to="/">
                <img src={logo} alt="Logo" />
            </Link>
            <div>
                <ul className={styles.links}>
                    {user ? (
                        <h1 className={styles.link}>{user.username}</h1>
                    ) : (<></>)}
                    <Link className={styles.link} to='/'>Home</Link>
                    <Link className={styles.link} to='/shop'>Shop</Link>
                    {user ? (
                        <>
                            <Link className={styles.link} to='/sell'>Sell</Link>
                            <Link className={styles.link} onClick={logout}>Logout</Link>
                        </>
                    ): (
                        <Link className={styles.link} to='/login'>Login / Signup</Link>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Navbar