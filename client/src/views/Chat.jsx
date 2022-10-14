import React from 'react'

import Navbar from '../components/Navbar'

const Chat = ({user, setUser}) => {
    return (
        <div>
            <Navbar user={user} setUser={setUser}/>
        </div>
    )
}

export default Chat