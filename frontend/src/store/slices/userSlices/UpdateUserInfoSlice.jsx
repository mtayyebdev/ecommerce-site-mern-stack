import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify';

export const UpdateUserInfo=createAsyncThunk('updateuserinfo',async(data,{rejectWithValue})=>{
    try{
        const res=await axios.patch(`${import.meta.env.VITE_API}/api/auth/updateinfo/${data.id}`,data.data,{
            withCredentials:true
        })
        return res.data;
    }
    catch(error){
        return rejectWithValue(error);
    }
})

const UpdateUserInfoSlice =createSlice({
    name:'updateUserInfo',
    initialState:{
        data:null,
        err:null,
        loader:false
    },
    extraReducers:(builder)=>{
        builder
        .addCase(UpdateUserInfo.pending,(state,action)=>{
            state.loader=true;
        })
        .addCase(UpdateUserInfo.fulfilled,(state,action)=>{
            state.loader=false;
            state.data=action.payload;
            toast.success(action.payload.message);
        })
        .addCase(UpdateUserInfo.rejected,(state,action)=>{
            state.loader=false;
            state.err=action.payload;
        })
    }
});

export default UpdateUserInfoSlice.reducer;