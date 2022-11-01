import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar'
import SellForm from '../components/SellForm'
import styles from '../static/css/Sell.module.css'

const Sell = ({user, setUser}) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState([]);

    const createProduct = product => {
        axios.post('http://localhost:8000/api/product/new', product)
            .then(res => {
                setProducts([...products, res.data]);
                navigate('/shop');
            })
            .catch(err => {
                setErrors(err.response.data.errors);
            })
        }

    return (
        <div>
            <Navbar user={user} setUser={setUser}/>
            <h1 className={styles.header}>POST AN ITEM TO SELL</h1>
            <div className={styles.form}>
                <SellForm
                    onSubmitProp={createProduct}
                    errors={errors}
                    initialTitle=''
                    initialDescription=''
                    initialPrice=''
                    initialImage=''
                    user={user._id}
                />
            </div>
        </div>
    )
}

export default Sell