import { createSlice } from "@reduxjs/toolkit";

 export const sesionSlice = createSlice({
    name:"session",
    initialState:{
        isSession:false,
        userName:"",
    },
    reducers: {
        hasSesion:(state, action) =>{
            state.isSession = action.payload
        },
        setName:(state, action) =>{
            state.userName = action.payload
        }
    }
});
export default sesionSlice.reducer;

export const DataUser = (datos)=> {
    const  login = datos;
    await fetch ("http://localhost:3000/users").json().then(data =>{
        if (user.names == login.names && user.passwd == md5(login.passwd)) {
            hasSesion(true);
            setName(user.names);
         }
        
   })
};