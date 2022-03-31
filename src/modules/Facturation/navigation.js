import React, {useState, useEffect, useContext} from "react";
import "./facturation.style.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import FacturationHome from "./pages";
import { useGetVenteData } from "./utilities/hooks";
import { Chargement, LargeDialog } from "../../Components";
import { Box } from "@mui/system";
import useConnectSocket from "../../sockets";
import {SocketContext} from '../../App';

export default function NavigationFacturation() {
	const { loading, data } = useGetVenteData();
	const [canContinue, setCanContinue] = useState(false);
	const navigate = useNavigate();
    const socket = useContext(SocketContext);

	const handleContinuer = () => {
		setCanContinue(true);
	};
	const handleReturn = () => {
		navigate('/');
	};

    // use the sockets for vente module
    useConnectSocket(socket, 'vente');

	useEffect(() => {
		const hasStock = data.some(d => d.quantite > 0);
		setCanContinue(hasStock);
	}, [data]);

	return (
		<>
			{loading ? (
				<Box height="80vh" display="flex" justifyContent="center" alignItems="center">
					<Chargement message="Chargement des données ..." />
				</Box>
			) : 
			!canContinue ? (
			<LargeDialog 
				open={!canContinue}
				title="Alerte stock"
				message="Vous n'avez aucun produit dans votre stock. Voulez-vous continuer ?"
				agreeBtnText="Continuer"
				disagreeBtnText="Non"
				onClose={handleReturn}
				onAgree={handleContinuer}
				onDisagree={handleReturn}
			/>
			) : (
				<Routes>
					<Route path="/" element={<FacturationHome />} />
				</Routes>
			)}
		</>
	);
}
