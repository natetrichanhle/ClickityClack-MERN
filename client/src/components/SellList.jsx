import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import styles from '../static/css/SellList.module.css';
import DeleteButton from './DeleteButton';

const SellList = ({ user }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/product')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err))
    }, [])

    return (
        <div className={styles.mainContainer}>
            {user ? (
                <>
                    {products.map((product, index) => {
                        return (
                            <div className={`${styles.container} `} key={index}>
                                <Link to={'/sell/' + product._id}className={`${styles.link} ${styles.img}`}>
                                    <img src={product?.image} alt="image" className={styles.img} />
                                </Link>
                                    <h3 className={`${styles.product} ${styles.title}`}>{product.title}</h3>
                                    <h3 className={styles.product}>${product.price}</h3>
                                <button className={styles.btn}>Add to Cart</button>
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