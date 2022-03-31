import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const produitEntity = createEntityAdapter({
	selectId: (item) => item.id,
});

const initialState = produitEntity.getInitialState({
	status: "idle",
	venteRequestStatus: "idle",
	errors: null,
	categories: [],
});

export const creerCategoriesProduit = createAsyncThunk(
	"produits/get-categories-produit",
	async (data) => {
		const res = await axios.post("/api/produits/categories", data);
		return res.data;
	}
);

export const getCategoriesProduit = createAsyncThunk(
	"produits/get-categories-produit",
	async () => {
		const res = await axios.get("/api/produits/categories");
		return res.data;
	}
);

export const getProduits = createAsyncThunk(
	"produits/get-for-entreprise",
	async () => {
		const res = await axios.get("/api/produits");
		return res.data;
	}
);

export const getVenteDataProduits = createAsyncThunk(
	"produits/get-for-entreprise-vente",
	async () => {
		const res = await axios.get("/api/ventes/data");
		return res.data;
	}
);

export const creerProduit = createAsyncThunk(
	"produits/creer",
	async ({ data }) => {
		const res = await axios.post("/api/produits", data);
		return res.data;
	}
);

export const { reducer, actions } = createSlice({
	name: "produit",
	initialState,
	reducers: {
		initError: (state) => {
			state.errors = null;
		},
		appendProduit: (state, action) => {
			if (action.payload) {
				produitEntity.upsertOne(state, action.payload);
			}
		},
		appendCategorie: (state, action) => {
			if (action.payload) {
				state.categories = [...state.categories, action.payload];
			}
		},
	},
	extraReducers: {
		[getCategoriesProduit.pending]: (state) => {
			state.status = "loading";
		},
		[getCategoriesProduit.fulfilled]: (state, action) => {
			state.status = "fulfilled";
			state.categories = action.payload;
		},
		[getCategoriesProduit.rejected]: (state, action) => {
			state.status = "failed";
			state.errors = action.payload;
		},
		[getProduits.pending]: (state) => {
			state.status = "loading";
		},
		[getProduits.fulfilled]: (state, action) => {
			state.status = "fulfilled";
			produitEntity.upsertMany(state, action.payload);
		},
		[getProduits.rejected]: (state, action) => {
			state.status = "failed";
			state.errors = action.payload;
		},
		[getVenteDataProduits.pending]: (state) => {
			state.venteRequestStatus = "loading";
		},
		[getVenteDataProduits.fulfilled]: (state, action) => {
			state.venteRequestStatus = "fulfilled";
			produitEntity.upsertMany(state, action.payload);
		},
		[getVenteDataProduits.rejected]: (state, action) => {
			state.venteRequestStatus = "failed";
			state.errors = action.payload;
		},
		[creerProduit.pending]: (state) => {
			state.status = "loading";
		},
		[creerProduit.fulfilled]: (state, action) => {
			if (action.payload.state === "success") {
				state.status = "fulfilled";
				produitEntity.upsertOne(state, action.payload.produit);
			} else {
				state.status = "failed";
				const err = action.payload;
				if (err && err.message) {
					state.errors = err.message;
				} else {
					state.errors =
						"Une erreur est survenue lors de l'enregistrement du produit. Veuillez réesayer.";
				}
			}
		},
		[creerProduit.rejected]: (state, action) => {
			state.status = "failed";
			state.errors = action.payload;
		},
	},
});

export const { selectAll, selectById } = produitEntity.getSelectors(
	(state) => state.produits
);

export const getReqState = (state) => state.produits.status;
export const getErrors = (state) => state.produits.errors;
export const getVenteRequestStatus = (state) =>
	state.produits.venteRequestStatus;
export const getCategories = (state) => state.produits.categories;
export const getCounts = (state) => {
	let produits = Object.values(state.produits.entities);

	const all = produits.length;
	const dispo = produits.filter(p => p.quantite > 0).length;
	const indispo = produits.filter(p => p.quantite <= 0).length;
	const alert = produits.filter(p => p.quantite <= p.quantite_min).length;

	return {
		all,
		dispo,
		indispo,
		alert
	}
};
export const getFilterdProduits = (state, categorieId, filter) => {
	let produits = Object.values(state.produits.entities);

    if (categorieId && categorieId !== "") {
        produits = Object.values(produits).filter(
            (prod) => prod.categorieProduitId === categorieId)
    }

	if (filter === "tous") {
		return produits;
	} else if (filter === "dispo") {
        return produits.filter(prod => prod.quantite > 0);
    } else if (filter === "indispo") {
        return produits.filter(prod => prod.quantite <= 0);
    } else if (filter === "alert") {
        return produits.filter(prod => prod.quantite <= prod.quantite_min);
    }
};
