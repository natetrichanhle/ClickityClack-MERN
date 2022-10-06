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

    const removeFromDom = productId => {
        setProducts(products.filter(product => product._id !== productId))
    }

    return (
        <div>
            {products.map((product, index) => {
                return (
                    <div className={styles.container} key={index}>
                        <div className={styles.productInfo}>
                            <img src={product.image} alt="image" className={styles.img} />
                            <Link className={styles.link} to={'/sell/' + product._id}><h3 className={`${styles.product} ${styles.title}`}>{product.title}</h3></Link>
                            <h3 className={styles.product}>{product.description}</h3>
                            <h3 className={styles.product}>{product.price}</h3>
                            {user ? (
                                <div className={styles.btns}>
                                    <Link
                                        to={'/sell/edit/' + product._id}
                                        className={styles.linkBtn}
                                    >Edit
                                    </Link>
                                    <DeleteButton
                                        productId={product._id}
                                        successCallback={() => removeFromDom(product._id)}
                                    />
                                </div>
                            ) : (<></>)}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SellList