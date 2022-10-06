import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Navbar from '../components/Navbar'
import SellList from '../components/SellList'

const Shop = ({ user }) => {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/product')
            .then(res => {
                setProducts(res.data)
                setLoaded(true);
            })
            .catch(err => console.error(err));
    }, [])

    return (
        <div>
            <Navbar user={user} />
            {loaded && <SellList products={products} user={user} />}
        </div>
    )
}

export default Shop