import React, { useState } from 'react'
import styles from '../static/css/SellForm.module.css'
import { useNavigate } from 'react-router-dom';

const SellForm = (props) => {
    const navigate = useNavigate();
    const {initialTitle, initialDescription, initialPrice, onSubmitProp, errors} = props;
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [price, setPrice] = useState(initialPrice);

    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmitProp({title, description, price});
        navigate('/shop');
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form onSubmit={onSubmitHandler}>
                    {/* {errors.map((err,index) => <p key={index}>{err}</p>)} */}
                    <input 
                        type='text' 
                        placeholder='Title' 
                        value={title} 
                        name='title'
                        onChange={(e) => {setTitle(e.target.value)}}
                        className={styles.formInput}
                    />
                    <br />
                    <input 
                        type='text' 
                        placeholder='Description' 
                        value={description} 
                        name='description'
                        onChange={(e) => {setDescription(e.target.value)}}
                        className={styles.formInput}
                    />
                    <br />
                    <input 
                        type='number' 
                        placeholder='Price' 
                        value={price} 
                        name='price'
                        onChange={(e) => {setPrice(e.target.value)}}
                        className={styles.formInput}
                    />
                    <br />
                    <input type="submit" placeholder='Submit' className={styles.btn}/>
                </form>
            </div>
        </div>
    )
}

export default SellForm