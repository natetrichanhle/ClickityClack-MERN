import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

import Navbar from '../components/Navbar'
import styles from '../static/css/Cart.module.css'
import back from '../static/images/back.png'

const Cart = ({ user, setUser }) => {
    const cart = useSelector((state) => state.cart);

    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <div className={styles.cartContainer}>
                <h2>Shopping Cart</h2>
                {cart.cartItems.length === 0 ? (
                    <div className={styles.cartEmpty}>
                        <p>Your cart is currently empty</p>
                        <div className={styles.startShopping}>
                            <Link to="/shop">
                                <img src={back} alt="back-arrow" className={styles.backArrow} />
                                <span>Start Shopping</span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className={styles.titles}>
                            <h3 className={styles.productTitle}>Product</h3>
                            <h3 className={styles.price}>Price</h3>
                            <h3 className={styles.quantity}>Quantity</h3>
                            <h3 className={styles.total}>Total</h3>
                        </div>
                        <div className={styles.cartItems}>
                            {cart.cartItems?.map(cartItem => (
                                <div className={styles.cartItem} key={cartItem.id}>
                                    <div className={styles.cartProduct}>
                                        <img src={cartItem.image} alt={cartItem.name} />
                                        <div>
                                            <h3>{cartItem.title}</h3>
                                            <p>{cartItem.description}</p>
                                            <button>Remove</button>
                                        </div>
                                    </div>
                                    <div className={styles.cartProductPrice}>
                                        ${cartItem.price}
                                    </div>
                                    <div className={styles.cartProductQuantity}>
                                        <button>-</button>
                                        <div className={styles.count}>{cartItem.cartQuantity}</div>
                                        <button>+</button>
                                    </div>
                                    <div className={styles.cartProductTotalPrice}>
                                        ${cartItem.price * cartItem.cartQuantity}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.cartSummary}>
                            <button className={styles.clearCart}>Clear Cart</button>
                            <div className={styles.cartCheckout}>
                                <div className={styles.subtotal}>
                                    <span>Subtotal</span>
                                    <span className={styles.amount}>${cart.cartTotalAmount}</span>
                                </div>
                                <p>Taxes and Shipping Calculated at Checkout</p>
                                <button>Checkout</button>
                                <div className={styles.continueShopping}>
                                    <Link to="/shop">
                                        <img src={back} alt="back-arrow" className={styles.backArrow} />
                                        <span>Continue Shopping</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart