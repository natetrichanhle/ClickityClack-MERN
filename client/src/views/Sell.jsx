import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import '../static/scss/Sell.css'

import Navbar from '../components/Navbar'
import SellForm from '../components/SellForm'

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
            <div className='SellForm'>
                <SellForm
                    onSubmitProp={createProduct}
                    errors={errors}
                    initialTitle=''
                    initialDescription=''
                    initialPrice=''
                    initialImage=''
                    user={user._id}
                    page={'POST AN ITEM TO SELL'}
                />
            </div>
        </div>
    )
}

export default Sell