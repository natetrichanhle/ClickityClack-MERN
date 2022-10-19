import React, { useState, useEffect } from "react";

import Navbar from '../components/Navbar'


const Cart = ({ user, setUser }) => {

    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            <div className="div">
                
            </div>
        </div>
    )
}

export default Cart