import React from 'react'
import axios from 'axios'

import styles from '../static/css/SellList.module.css'

const DeleteButton = (props) => {
    const {productId, successCallback } = props;

    const deleteProduct = e => {
        axios.delete('http://localhost:8000/api/product/' + productId)
            .then(res => {
                successCallback();
            })
    }

    return (
        <div>
            <button 
                className={styles.deleteBtn}
                onClick={deleteProduct}
            >
                Delete
            </button>
        </div>
    )
}

export default DeleteButton