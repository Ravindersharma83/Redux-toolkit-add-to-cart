import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        addToCart(state,action){
            // console.log('cart----',action.payload);
            
            let myIndex = -1; // to check for an empty cart array
            state.map((oldItems,index)=>{
                // console.log('old---',oldItems.id);
                // console.log('selected data----',action.payload.id);
                // check if product is already exists in the cart
                if(oldItems.id == action.payload.id){
                    // console.log('id matched',index);
                    myIndex = index;
                    // console.log('myIndex',myIndex);
                }
            })
            
            if(myIndex == -1){
                state.push({...action.payload,qty:action.payload.qty + 1});
                console.log('new state',action.payload);
            }else{
                state[myIndex].qty = state[myIndex].qty + 1;
                console.log('products----',state);
                console.log('old state',state[myIndex]);
            }
        },
        removeFromCart(state,action){            
            let myIndex = -1; 
            state.map((oldItems,index)=>{
                // check if product is already exists in the cart
                if(oldItems.id == action.payload.id){
                    myIndex = index;
                }
            })
            if(myIndex == -1){
                state.push({...action.payload,qty:action.payload.qty - 1});
                console.log('new state',action.payload);
            }else{
                state[myIndex].qty = state[myIndex].qty - 1;
                console.log('products----',state);
                console.log('old state',state[myIndex]);
            }
        },
        deleteMyCartItem(state,action){
            return state = state.filter(item=>item.id != action.payload)
        }
    }
})

export const {addToCart,removeFromCart,deleteMyCartItem} = CartSlice.actions;
export default CartSlice.reducer;