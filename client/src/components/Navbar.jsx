import React from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

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
        <div className='NavContainer'>
            <Link to="/">
                <img src={logo} alt="Logo" />
            </Link>
            <div>
                <ul className='NavLinks'>
                    {user ? (
                        <Link className='NavLink' to='/profile'>
                            <img src={user.avatar} alt="avatar" className='NavAvatar' />
                            {user.username}
                        </Link>
                    ) : (<></>)}
                    <Link className='NavLink' to='/'>
                        <img src={home} alt="home" className='NavIcons' />
                        Home
                    </Link>
                    <Link className='NavLink' to='/shop'>
                        <img src={shop} alt="shop" className='NavIcons' />
                        Shop
                    </Link>
                    {user ? (
                        <>
                            <Link className='NavLink' to='/sell'>
                                <img src={sell} alt="sell" className='NavIcons' />
                                Sell
                            </Link>
                            {/* <Link className='link' to='/chat'>
                                <img src={chat} alt="chat" className='NavIcons' />
                                Chat
                            </Link> */}
                            <Link className='NavLink' to='/cart'>
                                <img src={cart} alt="cart" className='NavIcons' />
                                <span className='cartQuantity'>{cartTotalQuantity}</span>
                                <span>Cart</span>
                            </Link>
                            <Link className='NavLink' onClick={logout}>
                                <img src={logoutIcon} alt="logout" className='NavIcons' />
                                Logout
                            </Link>
                        </>
                    ) : (
                        <Link className='NavLink' to='/login'>
                            <img src={login} alt="login" className='NavIcons' />
                            Login / Signup
                        </Link>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Navbar