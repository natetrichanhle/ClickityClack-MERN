import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../static/css/ProfileSideNav.module.css'
import post from '../static/images/post.png'
import avatar from '../static/images/avatar.png'
import orders from '../static/images/orders.png'

const ProfileSideNav = () => {
    return (
        <div className={styles.container}>
            <ul className={styles.links}>
                <Link to="/profile" className={styles.link}>
                    <img src={avatar} alt="avatar" className={styles.icons} />
                    Profile
                </Link>
                <Link to="/posts" className={styles.link}>
                    <img src={post} alt="post" className={styles.icons}/>
                    Posts
                </Link>
                <Link to="/orders" className={styles.link}>
                    <img src={orders} alt="orders" className={styles.icons}/>
                    Orders
                </Link>
            </ul>
        </div>
    )
}

export default ProfileSideNav