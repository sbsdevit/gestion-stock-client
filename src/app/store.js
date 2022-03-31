import { configureStore } from '@reduxjs/toolkit';
import {reducer as productReducer} from './reducers/produit';
import {reducer as entreeReducer} from './reducers/entree';
import {reducer as stockReducer} from './reducers/stock';
import {reducer as venteReducer} from './reducers/vente';
import {reducer as assujettiReducer} from './reducers/assujetti';
import {reducer as factureReducer} from './reducers/facture';
import {reducer as ConfigReducer} from './reducers/config';
import {reducer as factureAchatReducer} from './reducers/factureAchat';
import {reducer as ficheStockReducer} from './reducers/ficheStock';

export const store = configureStore({
  reducer: {
    produits: productReducer,
    entrees: entreeReducer,
    stocks: stockReducer,
    ventes: venteReducer,
    assujetti: assujettiReducer,
    factures: factureReducer,
    facturesAchat: factureAchatReducer,
    configs: ConfigReducer,
    ficheStocks: ficheStockReducer
  },
});
