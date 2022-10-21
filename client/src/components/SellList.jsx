import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

import { useGetAllProductsQuery } from '../slices/productsApi'
import { useDispatch } from 'react-redux'
import { addToCart } from '../slices/cartSlice'

import styles from '../static/css/SellList.module.css';

const SellList = ({ user }) => {
    // const {data, error, isLoading} = useGetAllProductsQuery()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/product')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err))
    }, [])

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
        navigate('/cart')
    }

    return (
        <div className={styles.mainContainer}>
            {user ? (
                <>
                    {products.map((product, index) => {
                        return (
                            <div className={`${styles.container} `} key={index}>
                                <Link to={'/sell/' + product._id} className={`${styles.link} ${styles.img}`}>
                                    <img src={product?.image} alt="image" className={styles.img} />
                                </Link>
                                <h3 className={`${styles.product} ${styles.title}`}>{product.title}</h3>
                                <h3 className={styles.product}>${product.price}</h3>
                                <button className={styles.btn} onClick={() => handleAddToCart(product)}>Add to Cart</button>
                            </div>
                        )
                    })}
                </>
            ) : (
                <>
                    {products.map((product, index) => {
                        return (
                            <div className={`${styles.container} ${styles.link}`} key={index}>
                                <img src={product?.image} alt="image" className={styles.img} />
                                <h3 className={`${styles.product} ${styles.title}`}>{product.title}</h3>
                                <h3 className={styles.product}>${product.price}</h3>
                            </div>
                        )
                    })}
                </>
            )}
        </div>
    )
}

export default SellList