import React from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

import styles from '../static/css/Navbar.module.css'

import logo from "../static/images/Logo.png"
import home from '../static/images/home.png'
import shop from '../static/images/shop.png'
import sell from '../static/images/sell.png'
import cart from '../static/images/cart.png'
import login from '../static/images/login.png'
import chat from '../static/images/chat.png'
import logoutIcon from '../static/images/logout.png'

const Navbar = ({ user, setUser }) => {
    const navigate = useNavigate();

    const logout = () => {
        axios.get("http://localhost:8000/api/logout", { withCredentials: true })
            .then(res => {
                console.log(res.data)
                setUser('');    
                navigate("/login");
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
                            <img src={user.avatar} alt="avatar" className={styles.avatar} />
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
                            <Link className={styles.link} to='/chat'>
                                <img src={chat} alt="chat" className={styles.icons} />
                                Chat
                            </Link>
                            <Link className={styles.link} to='/cart'>
                                <img src={cart} alt="cart" className={styles.icons} />
                                Cart
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