import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

import SellForm from '../components/SellForm'
import Navbar from '../components/Navbar'

const UpdateSell = ({user, setUser}) => {
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
            <Navbar user={user} setUser={setUser}/>
            {loaded && (
                <>
                    <SellForm 
                        onSubmitProp={updateProduct}
                        initialTitle={product?.title}
                        initialDescription={product?.description}
                        initialPrice={product?.price}
                        page={'UPDATE YOUR ITEM'}
                    />
                </>
            )}
        </div>
    )
}

export default UpdateSell