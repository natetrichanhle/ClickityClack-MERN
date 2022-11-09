import React from 'react'
import { Link } from 'react-router-dom'

import '../static/scss/ProfileSideNav.css'
import post from '../static/images/post.png'
import avatar from '../static/images/avatar.png'
import orders from '../static/images/orders.png'

const ProfileSideNav = () => {
    return (
        <div className='ProfileSideNavContainer'>
            <ul className='ProfileSideNavLinks'>
                <Link to="/profile" className='ProfileSideNavLink'>
                    <img src={avatar} alt="avatar" className='ProfileSideNavIcons' />
                    Profile
                </Link>
                <Link to="/posts" className='ProfileSideNavLink'>
                    <img src={post} alt="post" className='ProfileSideNavIcons'/>
                    Posts
                </Link>
                <Link to="/orders" className='ProfileSideNavLink'>
                    <img src={orders} alt="orders" className='ProfileSideNavIcons'/>
                    Orders
                </Link>
            </ul>
        </div>
    )
}

export default ProfileSideNav