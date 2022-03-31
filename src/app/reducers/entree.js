import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import axios from 'axios';

const entreeEntity = createEntityAdapter({
    selectId: item => item.id,
})

const initialState = entreeEntity.getInitialState({
    status: 'idle',
    errors: null,
    count: 0,
    numeros: []
});

// Effectue une entrée en stock pour un seul produit
export const creerEntree = createAsyncThunk(
    'entree/creer',
    async ({produitId, data}) => {
        const res = await axios.post(`/api/entrees/${produitId}`, data);
        return res.data;
    }
    );
    
    // Effectue une entrée en stock pour plusieurs produits
    export const creerEntreeMultiple = createAsyncThunk(
        'entree/creation multiple',
        async ({data, factureId}) => {
            const res = await axios.post(`/api/entrees/facture/${factureId}`, data);
            return res.data;
        }
    );

export const getEntreeCount = createAsyncThunk(
    'entree/count',
    async () => {
        const res = await axios.get(`/api/entrees/count`);
        return res.data;
    }
);

export const getEntreeNumeros = createAsyncThunk(
    'entree/liste des numéro',
    async () => {
        const res = await axios.get(`/api/entrees/numeros`);
        return res.data;
    }
);


export const {reducer, actions} = createSlice({
    name: 'entrees',
    initialState,
    extraReducers: {
        [creerEntree.pending]: (state) => {
            state.status = 'loading';
        },
        [creerEntree.fulfilled]: (state, action) => {
            if (action.payload.state === "success") {
                state.status = 'fulfilled';
                entreeEntity.upsertOne(state, action.payload.entree);
            } else {
                state.status = 'fulfilled';
                state.errors = action.payload;
            }
        },
        [creerEntree.rejected]: (state, action) => {
            state.status = 'failed';
            state.errors = action.payload;
        },
        [creerEntreeMultiple.pending]: (state) => {
            state.status = 'loading';
        },
        [creerEntreeMultiple.fulfilled]: (state, action) => {
            if (action.payload.state === "success") {
                state.status = 'fulfilled';
                entreeEntity.addMany(state, action.payload.entrees);
            } else {
                state.status = 'fulfilled';
                state.errors = action.payload;
            }
        },
        [creerEntreeMultiple.rejected]: (state, action) => {
            state.status = 'failed';
            state.errors = action.payload;
        },
        [getEntreeCount.pending]: (state) => {
            state.status = 'loading';
        },
        [getEntreeCount.fulfilled]: (state, action) => {
            if (action.payload) {
                state.status = 'fulfilled';
                if (action.payload.count) {
                    state.count = action.payload.count;
                }
            } 
        },
        [getEntreeCount.rejected]: (state, action) => {
            state.status = 'failed';
            state.errors = action.payload;
        },
    }
})

export const {
    selectAll,
    selectById,
} = entreeEntity.getSelectors(state => state.entrees);

export const getReqState = state => state.entrees.status;
export const getErrors = state => state.entrees.errors;
export const getCount = state => state.entrees.count;