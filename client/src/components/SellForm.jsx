import React, { useState } from 'react'

import styles from '../static/css/SellForm.module.css'

const SellForm = (props) => {
    const { initialTitle, initialDescription, initialPrice, initialImage, onSubmitProp, errors, user } = props;
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [price, setPrice] = useState(initialPrice);
    const [image, setImage] = useState(initialImage);

    const [titleValid, setTitleValid] = useState(true);
    const [descriptionValid, setDescriptionValid] = useState(true);
    const [priceValid, setPriceValid] = useState(true);

    const titleErr = 'Title is required'
    const descriptionErr = 'Description is required'
    const priceErr = 'Price is required'

    const handleTitle = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);

        if(!newTitle){
            setTitleValid(false);
        } else {
            setTitleValid(true);
        }
    }

    const handleDescription = (e) => {
        const newDescription = e.target.value;
        setDescription(newDescription);

        if(!newDescription){
            setDescriptionValid(false);
        } else {
            setDescriptionValid(true);
        }
    }

    const handlePrice = (e) => {
        const newPrice = e.target.value;
        setPrice(newPrice);

        if(!newPrice){
            setPriceValid(false);
        } else {
            setPriceValid(true);
        }
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmitProp({ title, description, price, image, user });
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
                    <p>
                        <input
                            type='text'
                            placeholder='Title'
                            value={title}
                            name='title'
                            onChange={handleTitle}
                            className={styles.formInput}
                            required
                        />
                        {!titleValid && <p className={styles.err}>{titleErr}</p>}
                    </p>
                    <p>
                        <input
                            type='text'
                            placeholder='Description'
                            value={description}
                            name='description'
                            onChange={handleDescription}
                            className={styles.formInput}
                            required
                        />
                        {!descriptionValid && <p className={styles.err}>{descriptionErr}</p>}
                    </p>
                    <p>
                        <input
                            type='number'
                            placeholder='Price'
                            value={price}
                            name='price'
                            onChange={handlePrice}
                            className={styles.formInput}
                            required
                        />
                        {!priceValid && <p className={styles.err}>{priceErr}</p>}
                    </p>
                    <input type="submit" placeholder='Submit' className={styles.btn} />
                </form>
            </div>
        </div>
    )
}

export default SellForm