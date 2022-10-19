import React from 'react'
import Navbar from '../components/Navbar'
import { useGetAllProductsQuery } from '../slices/productsApi'

import styles from '../static/css/Home.module.css'
import home1 from '../static/images/home1.jpg'

const Home = ({user, setUser}) => {
    const {data, error, isLoading} = useGetAllProductsQuery()
    return (
        <div>
            <Navbar user={user} setUser={setUser}/>
            <div className={styles.container}>
                <img src={home1} alt="home1" className={styles.homeImg}/>
            </div>
        </div>
    )
}

export default Home