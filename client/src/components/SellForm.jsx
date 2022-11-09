import React, { useState } from 'react'

import '../static/scss/SellForm.css'

const SellForm = (props) => {
    const { initialTitle, initialDescription, initialPrice, initialImage, onSubmitProp, errors, user, page} = props;
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [price, setPrice] = useState(initialPrice);
    const [image, setImage] = useState(initialImage);

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
        <div className='SellFormContainer'>
            <div className='SellFormFormContainer'>
                <h1 className='SellFormHeader'>{page}</h1>
                <form onSubmit={onSubmitHandler}>
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
                            onChange={e => {setTitle(e.target.value)}}
                            className='SellFormFormInput'
                            // required
                        />
                        {/* {errors.title && <p className='err'>{errors.title.message}</p>} */}
                    </p>
                    <p>
                        <input
                            type='text'
                            placeholder='Description'
                            value={description}
                            name='description'
                            onChange={e => {setDescription(e.target.value)}}
                            className='SellFormFormInput'
                            // required
                        />
                        {/* {errors.description && <p className='err'>{errors.description.message}</p>} */}
                    </p>
                    <p>
                        <input
                            type='number'
                            placeholder='Price'
                            value={price}
                            name='price'
                            onChange={e => {setPrice(e.target.value)}}
                            className='SellFormFormInput'
                            // required
                        />
                        {/* {errors.price && <p className='err'>{errors.price.message}</p>} */}
                    </p>
                    <input type="submit" placeholder='Submit' className='SellFormBtn' />
                </form>
            </div>
        </div>
    )
}

export default SellForm