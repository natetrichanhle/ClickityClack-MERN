import React from 'react'
import Navbar from '../components/Navbar'

import '../static/scss/CheckoutSuccess.css'
const CheckoutSuccess = ({ user, setUser }) => {
    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <h2 className='Checkout'>Checkout Success!</h2>
        </div>
    )
}

export default CheckoutSuccess