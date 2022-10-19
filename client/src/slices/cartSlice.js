import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex( (item) => item._id === action.payload._id );
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info(`Increased ${state.cartItems[itemIndex].title} quantity`, {
                    position: 'bottom-left'
                });
            } else {
                const tempProduct = {...action.payload, cartQuantity: 1};
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.title} added to cart`, {
                    position: 'bottom-left'
                });
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        }
    }
})

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;