import React from 'react'

import Navbar from '../components/Navbar'
import ProfileSideNav from '../components/ProfileSideNav'

const Profile = ({user}) => {

    return (
        <div>
            <Navbar user={user}/>
            <ProfileSideNav />
        </div>
    )
}

export default Profile