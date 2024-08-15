import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//     name:"auth",
//     initialState:{
//         loading:false,
//         user:null
//     },
//     reducers:{
//         // actions
//         setLoading:(state, action)=>{
//             state.loading = action.payload;
//         },
//         setUser:(state,action)=>{
//             state.user = action.payload;
//         }
//     }
// })

// export const {setLoading, setUser} = authSlice.actions;
// export default authSlice.reducer;

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
        token: null  // Add token to initial state
    },
    reducers: {
        // actions
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {  // Add setToken reducer
            state.token = action.payload;
        }
    }
});

// Export actions
export const { setLoading, setUser, setToken } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
