import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../static/css/ProfileSideNav.module.css'

const ProfileSideNav = () => {
    return (
        <div className={styles.container}>
            <ul className={styles.links}>
                <Link to="/mypost" className={styles.link}>
                    My Profile
                </Link>
                <Link to="/mypost" className={styles.link}>
                    My Posts
                </Link>
            </ul>
        </div>
    )
}

export default ProfileSideNav