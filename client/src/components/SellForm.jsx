import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import styles from '../static/css/SellForm.module.css'

const SellForm = (props) => {
    const navigate = useNavigate();
    const { initialTitle, initialDescription, initialPrice, initialImage, onSubmitProp, errors, user } = props;
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [price, setPrice] = useState(initialPrice);
    const [image, setImage] = useState(initialImage);

    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmitProp({ title, description, price, image, user });
        navigate('/shop');
    }

    const handleProductImageUpload = (e) => {
        const file = e.target.files[0];

        transformFile(file)
    }

    const transformFile = (file) => {
        const reader = new FileReader()

        if(file) {
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setImage(reader.result)
            }
        } else {
            setImage('')
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form onSubmit={onSubmitHandler}>
                    {errors.map((err, index) => <p key={index}>{err}</p>)}
                    <input 
                        type='file'
                        accept='image/'
                        name='image'
                        onChange={handleProductImageUpload}
                        required
                    />
                    <input
                        type='text'
                        placeholder='Title'
                        value={title}
                        name='title'
                        onChange={(e) => {setTitle(e.target.value)}}
                        className={styles.formInput}
                        required
                    />
                    <input
                        type='text'
                        placeholder='Description'
                        value={description}
                        name='description'
                        onChange={(e) => {setDescription(e.target.value)}}
                        className={styles.formInput}
                        required
                    />
                    <input
                        type='number'
                        placeholder='Price'
                        value={price}
                        name='price'
                        onChange={(e) => {setPrice(e.target.value)}}
                        className={styles.formInput}
                        required
                    />
                    <input type="submit" placeholder='Submit' className={styles.btn} />
                </form>
            </div>
        </div>
    )
}

export default SellForm