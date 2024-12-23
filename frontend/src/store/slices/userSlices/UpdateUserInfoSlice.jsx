import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const UpdateUserInfo=createAsyncThunk('updateuserinfo',async(data,{id},{rejectWithValue})=>{
    try{
        const res=await axios.patch(`${import.meta.env.API}/api/auth/updateinfo/${id}`,data)
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
        })
        .addCase(UpdateUserInfo.rejected,(state,action)=>{
            state.loader=false;
            state.err=action.payload;
        })
    }
});

export default UpdateUserInfoSlice.reducer;