import React, {useContext} from "react";
import "./stock.styles.css";
import "./components/component.style.css";
import { Route, Routes } from "react-router-dom";
import PageProduit from "./pages/Produit";
import StockSideBar from './components/SideBar';
import ApprovisionnementPage from './pages/Approvisionnement';
import FicheStockPage from "./pages/FicheStock";
import NouveauProduit from "./pages/NouveauProduit";
import Historique from './pages/Historique';
import useConnectSocket from '../../sockets';
import {SocketContext} from '../../App';

export default function NavigationStock() {
    // Initialize the sockets for the stock module
    const socket = useContext(SocketContext);

    useConnectSocket(socket, 'gestion_stock');
	return (
        <div>
            <StockSideBar />
            <main className="main-stock">
                <Routes>
                    <Route path="/produits" element={<PageProduit />} />
                    <Route path="/nouveau_produit" element={<NouveauProduit />} />
                    <Route path="approvisionnement" element={<ApprovisionnementPage />} />
                    <Route path="/historique_approvisionnement" element={<Historique />} />
                    <Route path="fiche_de_stock" element={<FicheStockPage />} />
                    <Route path="/" element={<PageProduit />} />
                </Routes>
            </main>
        </div>
	);
}
