import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const UpdatePassword=createAsyncThunk('updatepassword',async(data,{rejectWithValue})=>{
    try{
        const res=await axios.patch(`${import.meta.env.API}/api/auth/updatepassword`,data)
        return res.data;
    }
    catch(error){
        return rejectWithValue(error);
    }
})

const UpdatePasswordSlice =createSlice({
    name:'updatepassword',
    initialState:{
        loading:false,
        data:null,
        err:null
    },
    extraReducers:(builder)=>{
        builder
        .addCase(UpdatePassword.pending,(state)=>{
            state.loading=true;
        })
        .addCase(UpdatePassword.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        })
        .addCase(UpdatePassword.rejected,(state,action)=>{
            state.loading=false;
            state.err=action.payload;
        })
    }
})

export default UpdatePasswordSlice.reducer