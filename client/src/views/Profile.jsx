import React from 'react'

import styles from '../static/css/Profile.module.css'
import Navbar from '../components/Navbar'
import ProfileSideNav from '../components/ProfileSideNav'
import { Link } from 'react-router-dom'

const Profile = ({user, setUser}) => {

    return (
        <div>
            <Navbar user={user} setUser={setUser}/>
            <div className={styles.container}>
                <ProfileSideNav />
                <h1 className={styles.header}>Profile</h1>
                <div className={styles.profileContainer}>
                    <div className={styles.userInfo}>
                        <img src={user.avatar} alt="avatar" className={styles.img}/>
                        <div className={styles.info}>
                            <h1>Username: {user.username}</h1>
                            <h1>Email: {user.email}</h1>
                            <Link to={`/user/edit/${user._id}`} className={styles.link}>Update Profile</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile