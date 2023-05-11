import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: "product",
    initialState: {
        products: []
    },
    reducers:{ 
        addProduct: (state,action) => {
           
            state.products.push(action.payload)
            
        },
        updateProduct: (state, action) =>{
            state.products = action.payload
        },
        deleteProduct: (state, action)  => {
            const id = action.payload;
            const filtered = state.products.filter((item: any) => item.productId !== id);
            state.products = filtered
            

        }
    }
});

export const { addProduct, updateProduct,deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;