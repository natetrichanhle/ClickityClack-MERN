import React from 'react'

import '../static/scss/Profile.css'
import Navbar from '../components/Navbar'
import ProfileSideNav from '../components/ProfileSideNav'
import { Link } from 'react-router-dom'

const Profile = ({user, setUser}) => {

    return (
        <div>
            <Navbar user={user} setUser={setUser}/>
            <div className='ProfileMainContainer'>
                <ProfileSideNav />
                <h1 className='ProfileHeader'>Profile</h1>
                <div className='ProfileContainer'>
                    <div className='UserInfo'>
                        <img src={user.avatar} alt="avatar" className='ProfileImg'/>
                        <div className='ProfileInfo'>
                            <h1>Username: {user.username}</h1>
                            <h1>Email: {user.email}</h1>
                            <Link to={`/user/edit/${user._id}`} className='ProfileLink'>Update Profile</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile