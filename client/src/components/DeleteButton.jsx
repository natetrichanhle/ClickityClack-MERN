import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import '../static/scss/SellList.css'

const DeleteButton = (props) => {
    const navigate = useNavigate()
    const {productId, successCallback } = props;

    const deleteProduct = e => {
        axios.delete('http://localhost:8000/api/product/' + productId)
            .then(res => {
                successCallback();
                navigate('/shop');
            })
    }

    return (
        <div>
            <button 
                className='deleteBtn'
                onClick={deleteProduct}
            >
                Delete
            </button>
        </div>
    )
}

export default DeleteButton