import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const venteEntity = createEntityAdapter({
	selectId: (item) => item.id,
});

const initialState = venteEntity.getInitialState({
	status: "idle",
	errors: null,
	count: null,
});

export const nouvelleVente = createAsyncThunk(
	"ventes/nouvelle vente",
	async (data) => {
		const res = await axios.post(`/api/ventes`, data);
		return res.data;
	}
);

export const getVenteCount = createAsyncThunk(
	"ventes/nombre des ventes",
	async () => {
		const res = await axios.get(`/api/ventes/count`);
		return res.data;
	}
);

export const { reducer, actions } = createSlice({
	name: "vente",
	initialState,
	reducers: {
		addFactureCourante: (state, action) => {
			state.factureRecente = action.payload;
		},
	},
	extraReducers: {
		[getVenteCount.pending]: (state) => {
			state.status = "loading";
		},
		[getVenteCount.fulfilled]: (state, action) => {
			state.status = "fulfilled";
			state.count = action.payload.count;
		},
		[getVenteCount.rejected]: (state, action) => {
			state.status = "failed";
			state.errors = action.payload;
		},
		[nouvelleVente.pending]: (state) => {
			state.status = "loading";
		},
		[nouvelleVente.fulfilled]: (state, action) => {
			if (action.payload.state === "success") {
				state.status = "fulfilled";
				const facture = {
					...action.payload.facture,
					ventes: action.payload.ventes,
				};

				state.factureRecente = facture;
			} else {
				state.status = "fulfilled";
				state.errors = action.payload;
			}
		},
		[nouvelleVente.rejected]: (state, action) => {
			state.status = "failed";
			state.errors = action.payload;
		},
	},
});

export const { selectAll, selectById } = venteEntity.getSelectors(
	(state) => state.ventes
);

export const getReqState = (state) => state.ventes.status;
export const getErrors = (state) => state.ventes.errors;
export const getCount = (state) => state.ventes.count;