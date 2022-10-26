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
                                    const date = new Date(order.createdAt)
                                    const subtotal = order?.subtotal / 100
                                    return (
                                        <div key={i} className={styles.orderInfo}>
                                            <div className={styles.orderInfoTop}>
                                                <div className={styles.info}>
                                                    <h3 className={styles.infoSubheading}>Order Placed</h3>
                                                    <h3>{date.toDateString()}</h3>
                                                </div>
                                                <div className={styles.info}>
                                                    <h3 className={styles.infoSubheading}>Product Price</h3>
                                                    <h3>${product?.price}</h3>
                                                </div>
                                                <div className={styles.info}>
                                                    <h3 className={styles.infoSubheading}>Order Subtotal</h3>
                                                    <h3>${subtotal}</h3>
                                                </div>
                                                <div className={styles.info}>
                                                    <h3 className={styles.infoSubheading}>Ship To</h3>
                                                    <div className={styles.dropdown}>
                                                        <h3 className={styles.dropbtn}>{order.shipping.name}</h3>
                                                        <div className={styles.dropdownContent}>
                                                            <h3>Nate Trichanh</h3>
                                                            <p>{order.shipping.address.line1} {order.shipping.address.city} {order.shipping.address.state}, {order.shipping.address.postal_code} {order.shipping.address.country}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.info}>
                                                    <h3 className={styles.infoSubheading}>Order Number</h3>
                                                    <h3>{order?._id}</h3>
                                                </div>
                                            </div>
                                            <div className={styles.productInfo}>
                                                <img src={product?.image} alt={product?.title} className={styles.img}/>
                                                <h2>{product?.title}</h2>
                                                <h2>Quantity: {product?.cartQuantity}</h2>
                                            </div>
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