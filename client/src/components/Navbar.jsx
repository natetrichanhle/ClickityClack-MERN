import React from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

import styles from '../static/css/Navbar.module.css'

import logo from "../static/images/Logo.png"
import home from '../static/images/home.png'
import shop from '../static/images/shop.png'
import sell from '../static/images/sell.png'
import avatar from '../static/images/avatar.png'
import login from '../static/images/login.png'
import logoutIcon from '../static/images/logout.png'

const Navbar = ({ user }) => {
    const navigate = useNavigate();

    const logout = () => {
        axios.get("http://localhost:8000/api/logout", { withCredentials: true })
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
                        <Link className={styles.link} to='/profile'>
                            <img src={avatar} alt="avatar" className={styles.icons} />
                            {user.username}
                        </Link>
                    ) : (<></>)}
                    <Link className={styles.link} to='/'>
                        <img src={home} alt="home" className={styles.icons} />
                        Home
                    </Link>
                    <Link className={styles.link} to='/shop'>
                        <img src={shop} alt="shop" className={styles.icons} />
                        Shop
                    </Link>
                    {user ? (
                        <>
                            <Link className={styles.link} to='/sell'>
                                <img src={sell} alt="sell" className={styles.icons} />
                                Sell
                            </Link>
                            <Link className={styles.link} onClick={logout}>
                                <img src={logoutIcon} alt="logout" className={styles.icons} />
                                Logout
                            </Link>
                        </>
                    ) : (
                        <Link className={styles.link} to='/login'>
                            <img src={login} alt="login" className={styles.icons} />
                            Login / Signup
                        </Link>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Navbar