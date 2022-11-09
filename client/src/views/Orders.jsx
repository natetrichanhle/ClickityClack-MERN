import React, { useState, useEffect } from 'react'
import axios from 'axios'

import '../static/scss/Orders.css'

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
            <div className='OrdersMainContainer'>
                <ProfileSideNav />
                <div className='OrdersContainer'>
                    <h1 className='OrdersHeader'>Orders</h1>
                    <div>
                        {myOrders.map((order, index) => {
                            return (
                                order.products.map((product, i) => {
                                    const date = new Date(order.createdAt)
                                    const subtotal = order?.subtotal / 100
                                    return (
                                        <div key={i} className='OrderInfoContainer'>
                                            <div className='OrderInfoTop'>
                                                <div className='OrderInfo'>
                                                    <h3 className='OrderInfoSubheading'>Order Placed</h3>
                                                    <h3>{date.toDateString()}</h3>
                                                </div>
                                                <div className='OrderInfo'>
                                                    <h3 className='OrderInfoSubheading'>Product Price</h3>
                                                    <h3>${product?.price}</h3>
                                                </div>
                                                <div className='OrderInfo'>
                                                    <h3 className='OrderInfoSubheading'>Order Subtotal</h3>
                                                    <h3>${subtotal}</h3>
                                                </div>
                                                <div className='OrderInfo'>
                                                    <h3 className='OrderInfoSubheading'>Ship To</h3>
                                                    <div className='OrderDropDown'>
                                                        <h3 className='OrderDropBtn'>{order.shipping.name}</h3>
                                                        <div className='OrderDropDownContent'>
                                                            <h3>Nate Trichanh</h3>
                                                            <p>{order.shipping.address.line1} {order.shipping.address.city} {order.shipping.address.state}, {order.shipping.address.postal_code} {order.shipping.address.country}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='OrderInfo'>
                                                    <h3 className='OrderInfoSubheading'>Order Number</h3>
                                                    <h3>{order?._id}</h3>
                                                </div>
                                            </div>
                                            <div className='OrderProductInfo'>
                                                <img src={product?.image} alt={product?.title} className='OrderImg'/>
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