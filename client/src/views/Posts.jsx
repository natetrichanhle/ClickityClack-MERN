import React from 'react'

import styles from '../static/css/Posts.module.css'
import Navbar from '../components/Navbar'
import ProfileSideNav from '../components/ProfileSideNav'

const Posts = ({user}) => {
    return (
        <div>
            <Navbar user={user} />
            <div className={styles.container}>
                <ProfileSideNav />
                <div className={styles.profileContainer}>
                    <h1>Posts</h1>
                </div>
            </div>
        </div>
    )
}

export default Posts