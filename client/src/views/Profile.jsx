import React from 'react'

import styles from '../static/css/Profile.module.css'
import Navbar from '../components/Navbar'
import ProfileSideNav from '../components/ProfileSideNav'

const Profile = ({user}) => {

    return (
        <div>
            <Navbar user={user}/>
            <div className={styles.container}>
                <ProfileSideNav />
                <h1 className={styles.header}>Profile</h1>
                <div className={styles.profileContainer}>
                    <div className={styles.userInfo}>
                        <div className={styles.info}>
                            <img src={user.avatar} alt="avatar" className={styles.img}/>
                            <h1>Username: {user.username}</h1>
                            <h1>Email: {user.email}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile