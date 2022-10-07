import React from 'react'

import Navbar from '../components/Navbar'

const Profile = ({user}) => {

    return (
        <div>
            <Navbar user={user}/>
            
        </div>
    )
}

export default Profile