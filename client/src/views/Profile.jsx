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
                <div className={styles.profileContainer}>
                    <h1 className={styles.header}>Profile</h1>
                </div>
            </div>
        </div>
    )
}

export default Profile