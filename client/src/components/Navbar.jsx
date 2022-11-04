import React from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

import styles from '../static/css/Navbar.module.css'
import '../static/scss/Navbar.css'

import logo from "../static/images/Logo.png"
import home from '../static/images/home.png'
import shop from '../static/images/shop.png'
import sell from '../static/images/sell.png'
import cart from '../static/images/cart.png'
import login from '../static/images/login.png'
import chat from '../static/images/chat.png'
import logoutIcon from '../static/images/logout.png'

const Navbar = ({ user, setUser }) => {
    const { cartTotalQuantity } = useSelector(state => state.cart)
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
        <div className='container'>
            <Link to="/">
                <img src={logo} alt="Logo" />
            </Link>
            <div>
                <ul className='links'>
                    {user ? (
                        <Link className='link' to='/profile'>
                            <img src={user.avatar} alt="avatar" className='avatar' />
                            {user.username}
                        </Link>
                    ) : (<></>)}
                    <Link className='link' to='/'>
                        <img src={home} alt="home" className='icons' />
                        Home
                    </Link>
                    <Link className='link' to='/shop'>
                        <img src={shop} alt="shop" className='icons' />
                        Shop
                    </Link>
                    {user ? (
                        <>
                            <Link className='link' to='/sell'>
                                <img src={sell} alt="sell" className='icons' />
                                Sell
                            </Link>
                            {/* <Link className='link' to='/chat'>
                                <img src={chat} alt="chat" className='icons' />
                                Chat
                            </Link> */}
                            <Link className='link' to='/cart'>
                                <img src={cart} alt="cart" className='icons' />
                                <span className='cartQuantity'>{cartTotalQuantity}</span>
                                <span>Cart</span>
                            </Link>
                            <Link className='link' onClick={logout}>
                                <img src={logoutIcon} alt="logout" className='icons' />
                                Logout
                            </Link>
                        </>
                    ) : (
                        <Link className='link' to='/login'>
                            <img src={login} alt="login" className='icons' />
                            Login / Signup
                        </Link>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Navbar