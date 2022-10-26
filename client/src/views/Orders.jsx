import React, { useState, useEffect } from 'react'
import axios from 'axios'

import styles from '../static/css/Orders.module.css'

import Navbar from '../components/Navbar'
import ProfileSideNav from '../components/ProfileSideNav'

const Orders = ({user, setUser}) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/order')
            .then(res => {
                setOrders(res.data)
            })
            .catch(err => console.error(err));
    }, [])

    const myOrders = orders.filter(order => order.userId === user._id)

    // console.log(myOrders)

    return (
        <div>
            <Navbar user={user} setUser={setUser}/>
            <div className={styles.container}>
                <ProfileSideNav />
                <div className={styles.orderContainer}>
                    <h1 className={styles.header}>Orders</h1>
                    <div>
                        {myOrders.map((order, index) => {
                            return (
                                order.products.map((product, i) => {
                                    return (
                                        <div key={i}>
                                            {/* <h1>{order.shipping.name}</h1> */}
                                            <h1>{product?.title}</h1>
                                            <img src={product?.image} alt={product?.title} />
                                        </div>
                                    )
                                })
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders