import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCompanies: any = createAsyncThunk('',async () => {
    const res = await axios.get('http://localhost:5000/api/v1/companies');
    return res.data;
})

export const companiesSlice = createSlice({
    name: "company",
    initialState: {
        companies: []
    },
    reducers:{

        addCompany: (state,action) => {

            axios.post('http://localhost:5000/api/v1/companies', action.payload)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
            
        },

        deleteCompany: (state,action) => {

            axios.delete(`http://localhost:5000/api/v1/companies/${action.payload}`)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        },

        updateCompany: (state,action) => {

            axios.put(`http://localhost:5000/api/v1/companies/${action.payload._id}`, action.payload)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        
    },

    extraReducers: {
        [fetchCompanies.fulfilled]: (state: any, action: any) => {
            state.companies = action.payload;
            
        }
    }
});

export const { addCompany, deleteCompany, updateCompany} = companiesSlice.actions;
export default companiesSlice.reducer;