import React from 'react'

import Navbar from '../components/Navbar'

const Cart = ({user, setUser}) => {
    return (
        <div>
            <Navbar user={user} setUser={setUser}/>
        </div>
    )
}

export default Cart