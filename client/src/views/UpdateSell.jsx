import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

import SellForm from '../components/SellForm'
import DeleteButton from '../components/DeleteButton'
import Navbar from '../components/Navbar'
import styles from '../static/css/UpdateSell.module.css'

const UpdateSell = ({user}) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/product/' + id)
            .then(res => {
                setProduct(res.data);
                setLoaded(true);
            })
    }, [])

    const updateProduct = product => {
        axios.put('http://localhost:8000/api/product/edit/' + id, product)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Navbar user={user}/>
            <h1 className={styles.header}>UPDATE YOUR PRODUCT</h1>
            {loaded && (
                <>
                    <SellForm 
                        onSubmitProp={updateProduct}
                        initialTitle={product.title}
                        initialDescription={product.description}
                        initialPrice={product.price}
                    />
                    {/* <DeleteButton 
                        productId={product._id}
                        successCallback = {() => navigate('/shop')}
                    /> */}
                </>
            )}
        </div>
    )
}

export default UpdateSell