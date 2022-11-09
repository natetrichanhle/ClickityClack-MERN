import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import '../static/scss/Posts.css'

import Navbar from '../components/Navbar'
import ProfileSideNav from '../components/ProfileSideNav'

const Posts = ({user, setUser}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/product')
            .then(res => {
                setProducts(res.data)
            })
            .catch(err => console.error(err));
    }, [])

    const posts = products.filter(product => product.user === user._id)

    return (
        <div>
            <Navbar user={user} setUser={setUser}/>
            <div className='PostsMainContainer'>
                <ProfileSideNav />
                <div className='PostsContainer'>
                    <h1 className='PostsHeader'>Posts</h1>
                    <div className='PostsInfo'>
                        {posts.map((post, index) => {
                            return(
                                <Link className='Posts PostLink' key={index} to={'/sell/' + post._id}>
                                    <img src={post?.image.url} alt="image" className='PostsImg' />
                                    <h3 className='PostsProduct PostsTitle'>{post.title}</h3>
                                    <h3 className='PostsProduct'>${post.price}</h3>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Posts