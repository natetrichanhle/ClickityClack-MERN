import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from "../slices/cartSlice";

import Navbar from '../components/Navbar'
import '../static/scss/Cart.css'
import back from '../static/images/back.png'
import PayButton from "../components/PayButton";

const Cart = ({ user, setUser }) => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch])

    const handleRemoveFromCart = (cartItem) => {
        dispatch(removeFromCart(cartItem))
    }

    const handleDecreaseCart = (cartItem) => {
        dispatch(decreaseCart(cartItem))
    }

    const handleIncreaseCart = (cartItem) => {
        dispatch(addToCart(cartItem))
    }

    const handleClearCart = () => {
        dispatch(clearCart())
    }

    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <div className='CartContainer'>
                <h2>Shopping Cart</h2>
                {cart.cartItems.length === 0 ? (
                    <div className='CartEmpty'>
                        <p>Your cart is currently empty</p>
                        <div className='StartShopping'>
                            <Link to="/shop">
                                <img src={back} alt="back-arrow" className='BackArrow' />
                                <span>Start Shopping</span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className='CartTitles'>
                            <h3 className='ProductTitle'>Product</h3>
                            <h3 className='Price'>Price</h3>
                            <h3 className='Quantity'>Quantity</h3>
                            <h3 className='Total'>Total</h3>
                        </div>
                        <div className='CartItems'>
                            {cart.cartItems?.map(cartItem => (
                                <div className='CartItem' key={cartItem._id}>
                                    <div className='CartProduct'>
                                        <img src={cartItem.image.url} alt={cartItem.name} />
                                        <div>
                                            <h3>{cartItem.title}</h3>
                                            <p>{cartItem.description}</p>
                                            <button onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
                                        </div>
                                    </div>
                                    <div className='CartProductPrice'>
                                        ${cartItem.price}
                                    </div>
                                    <div className='CartProductQuantity'>
                                        <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                                        <div className='Count'>{cartItem.cartQuantity}</div>
                                        <button onClick={() => handleIncreaseCart(cartItem)}>+</button>
                                    </div>
                                    <div className='CartProductTotalPrice'>
                                        ${cartItem.price * cartItem.cartQuantity}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='CartSummary'>
                            <button className='ClearCart' onClick={() => handleClearCart()}>Clear Cart</button>
                            <div className='CartCheckout'>
                                <div className='Subtotal'>
                                    <span>Subtotal</span>
                                    <span className='Amount'>${cart.cartTotalAmount}</span>
                                </div>
                                <p>Taxes and shipping calculated at checkout</p>
                                <PayButton cartItems={cart.cartItems} user={user} />
                                <div className='ContinueShopping'>
                                    <Link to="/shop">
                                        <img src={back} alt="back-arrow" className='BackArrow' />
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