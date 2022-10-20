import React from 'react'
import Navbar from '../components/Navbar'

const CheckoutSuccess = ({ user, setUser }) => {
    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <h2>Checkout Success</h2>
        </div>
    )
}

export default CheckoutSuccess