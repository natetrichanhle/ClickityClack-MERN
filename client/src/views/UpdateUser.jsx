import React from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import SignupForm from '../components/SignupForm';
import Navbar from '../components/Navbar';

const UpdateUser = ({user, setUser}) => {
    const navigate = useNavigate();
    const { id } = useParams()

    const updateUser = (username, email, avatar) => {
        axios.put('http://localhost:8000/api/user/edit/' + id, JSON.stringify({
            username,
            email,
            avatar,
        }),
        {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        })
        .then(res => {
            setUser(res.data.user)
            navigate("/profile");
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <Navbar user={user} setUser={setUser}/>
            <SignupForm 
                user={user}
                registerUser={updateUser}
                page={'Update User!'}
            />
        </div>
    )
}

export default UpdateUser