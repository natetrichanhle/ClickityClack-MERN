import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import DeleteButton from '../components/DeleteButton'
import styles from '../static/css/ViewOneSell.module.css'

const ViewOneSell = ({ user }) => {
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/product/' + id)
            .then(res => {
                const Product = res.data
                axios.get('http://localhost:8000/api/getUsername/' + res.data.user)
                    .then(res => setProduct({ ...Product, username: res.data.toString() }), setLoaded(true))
                    .catch(err => console.error(err))
            })
            .catch(err => console.error(err))
    }, [])

    const removeFromDom = productId => {
        setProducts(products.filter(product => product._id !== productId))
    }

    return (
        <div>
            <Navbar user={user} />
            {loaded &&
                <div className={styles.viewOneContainer}>
                    <img src={product?.image} alt="image" className={styles.img} />
                    <h1>{product?.username}</h1>
                    <h1>{product?.title}</h1>
                    <h1>{product?.description}</h1>
                    <h1>${product?.price}</h1>
                    {user._id === product.user ? (
                        <div className={styles.btns }>
                            <Link to={`/sell/edit/${product?._id}`} className={styles.link}>Edit</Link>
                            <DeleteButton
                                productId={product._id}
                                successCallback={() => removeFromDom(product._id)}
                            />
                        </div>
                    ) : (<></>)}
                </div>
            }
        </div>
    )
}

export default ViewOneSell