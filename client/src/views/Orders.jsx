import React from 'react'

import styles from '../static/css/Orders.module.css'

import Navbar from '../components/Navbar'
import ProfileSideNav from '../components/ProfileSideNav'

const Orders = ({user, setUser}) => {

    return (
        <div>
            <Navbar user={user} setUser={setUser}/>
            <div className={styles.container}>
                <ProfileSideNav />
                <div className={styles.orderContainer}>
                    <h1 className={styles.header}>Orders</h1>
                </div>
            </div>
        </div>
    )
}

export default Orders