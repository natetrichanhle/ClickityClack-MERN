import React from 'react'
import Navbar from '../components/Navbar'

import styles from '../static/css/Home.module.css'
import home1 from '../static/images/home1.jpg'

const Home = ({user}) => {
    return (
        <div>
            <Navbar user={user}/>
            <div className={styles.container}>
                <img src={home1} alt="home1" className={styles.homeImg}/>
            </div>
        </div>
    )
}

export default Home