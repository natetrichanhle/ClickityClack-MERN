import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

import { useGetAllProductsQuery } from '../slices/productsApi'
import { useDispatch } from 'react-redux'
import { addToCart } from '../slices/cartSlice'

import '../static/scss/SellList.css'

const SellList = ({ user }) => {
    // const {data, error, isLoading} = useGetAllProductsQuery()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/product')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err))
    }, [])

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
        navigate('/cart')
    }

    return (
        <div className='SellListMainContainer'>
            {user ? (
                <>
                    {products.map((product, index) => {
                        return (
                            <div className='SellListContainer' key={index}>
                                <Link to={'/sell/' + product._id} className='SellListLink SellListImg'>
                                    <img src={product?.image.url} alt="image" className='SellListImg' />
                                </Link>
                                <h3 className='SellListProduct SellListTitle'>{product.title}</h3>
                                <h3 className='SellListProduct'>${product.price}</h3>
                                <button className='SellListBtn' onClick={() => handleAddToCart(product)}>Add to Cart</button>
                            </div>
                        )
                    })}
                </>
            ) : (
                <>
                    {products.map((product, index) => {
                        return (
                            <div className='SellListContainer SellListLink' key={index}>
                                <img src={product?.image.url} alt="image" className='SellListImg' />
                                <h3 className='SellListProduct SellListTitle'>{product.title}</h3>
                                <h3 className='SellListProduct'>${product.price}</h3>
                            </div>
                        )
                    })}
                </>
            )}
        </div>
    )
}

export default SellList