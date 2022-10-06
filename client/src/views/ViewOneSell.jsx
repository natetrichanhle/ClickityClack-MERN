import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'


const ViewOneSell = ({user}) => {
    const { id } = useParams()
    const [product, setProduct] = useState({})

    useEffect(() => {
        axios.get('http://localhost:8000/api/product/' + id)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err))
    }, [])

    return (
        <div>
            <h1>{product.title}</h1>
            <h1>{product.description}</h1>
            <h1>{product.price}</h1>
            {user ? (
                <Link to={`/sell/edit/${product._id}`}>Edit</Link>
            ) : (<></>)}
        </div>
    )
}

export default ViewOneSell