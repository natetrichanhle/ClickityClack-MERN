import React, { useState } from 'react'
import axios from 'axios'

import Navbar from '../components/Navbar'
import SellForm from '../components/SellForm'
import styles from '../static/css/Sell.module.css'

const Sell = ({user, setUser}) => {
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState([]);

    const createProduct = product => {
        axios.post('http://localhost:8000/api/product/new', product)
            .then(res => {
                setProducts([...products, res.data]);
                console.log(res.data)
            })
            .catch(err => {
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
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