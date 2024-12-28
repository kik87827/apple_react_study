import { createSlice } from "@reduxjs/toolkit";

let cart = createSlice({
    name: 'cart',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'test', count: 1 }
    ],
    reducers : {
        changeCount(state,action){
            /* state.map(item => {
                if(item.id === action.payload){
                    item.count += 1;
                }
            }) */
            
            let findex = state.findIndex((a)=>{ return a.id === action.payload }) /* array에서 원하는거 몇번째 있나 찾아주는 함수 */
            state[findex].count++;
        },
        orderTake(state,action){
            console.log('orderTake',action.payload);
            // state.push(action.payload);
            state.push(action.payload);
        }
    }
})

export let {changeCount,orderTake} = cart.actions;
export default cart;