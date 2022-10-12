import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import styles from '../static/css/Posts.module.css'

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
            <div className={styles.container}>
                <ProfileSideNav />
                <div className={styles.profileContainer}>
                    <h1 className={styles.header}>Posts</h1>
                    <div className={styles.postContainer}>
                        {posts.map((post, index) => {
                            return(
                                <Link className={`${styles.posts} ${styles.link}`} key={index} to={'/sell/' + post._id}>
                                    <img src={post?.image} alt="image" className={styles.img} />
                                    <h3 className={`${styles.product} ${styles.title}`}>{post.title}</h3>
                                    <h3 className={styles.product}>${post.price}</h3>
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