import React from 'react'
import Navbar from '../components/Navbar'

import styles from '../static/css/CheckoutSuccess.module.css'

const CheckoutSuccess = ({ user, setUser }) => {
    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <h2 className={styles.checkout}>Checkout Success!</h2>
        </div>
    )
}

export default CheckoutSuccess