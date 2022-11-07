import React from 'react'
import Navbar from '../components/Navbar'

import '../static/scss/Home.css'
import home1 from '../static/images/home1.jpg'

const Home = ({user, setUser}) => {
    return (
        <div>
            <Navbar user={user} setUser={setUser}/>
            <div className='HomeContainer'>
                <img src={home1} alt="home1" className='homeImg'/>
            </div>
        </div>
    )
}

export default Home