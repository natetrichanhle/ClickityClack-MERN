import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { url } from '../slices/api'
import { toast } from 'react-toastify'

const initialState = {
    items: [], 
    status: null,
    error: null,
    createStatus: null,
}

export const productsFetch = createAsyncThunk(
    'products/productsFetch', 
    async (id=null, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8000/api/product')
            return response?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// export const productsCreate = createAsyncThunk(
//     'products/productsCreate', 
//     async (values) => {
//         try {
//             const response = await axios.post(`${url}/products`, values)
//             return response?.data
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response?.data)
//         }
//     }
// ) 

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: {
        [productsFetch.pending]: (state, action) => {
            state.status = 'pending'
        },
        [productsFetch.fulfilled]: (state, action) => {
            state.status = 'success'
            state.items = action.payload
        },
        [productsFetch.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },
        // [productsCreate.pending]: (state, action) => {
        //     state.createStatus = 'pending'
        // },
        // [productsCreate.fulfilled]: (state, action) => {
        //     state.createStatus = 'success'
        //     state.items.push(action.payload)
        // },
        // [productsCreate.rejected]: (state, action) => {
        //     state.createStatus = 'rejected'
        //     state.error = action.payload
        // }
    }
})

export default productsSlice.reducer