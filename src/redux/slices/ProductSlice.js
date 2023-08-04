import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
    name:'product',
    initialState:[],
    reducers:{
        addProducts(state,action){
            console.log('state---',state);
            state.push(action.payload);
            console.log('payload---',state);
        },

        increaseQty(state,action){
            let myIndex = -1;
            state.map((item,index)=>{
                if(item.id == action.payload.id){
                    myIndex = index
                }
            })
            if(myIndex != -1){
                state[myIndex].qty = state[myIndex].qty + 1;
            }
        },
        decreaseQty(state,action){
            let myIndex = -1;
            state.map((item,index)=>{
                if(item.id == action.payload.id){
                    myIndex = index
                }
            })
            if(myIndex != -1){
                state[myIndex].qty = state[myIndex].qty - 1;
            }
        }
    }
});

export const {addProducts,increaseQty,decreaseQty} = ProductSlice.actions;
export default ProductSlice.reducer;