import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Default from "../components/DefaultValues";
import FactureModal from "../components/FactureModal";
import { useSelector, useDispatch } from "react-redux";
import { getAssujetti } from "../../../app/reducers/assujetti";
import { getCurrentFacture, actions } from "../../../app/reducers/facture";
import { useGetNumFacture } from "../utilities/hooks";
import { validerDefaultValues } from "../utilities/validators";
import { nouvelleVente } from "../../../app/reducers/vente";
import FactureRecente from "../components/FactureRecente";
import { getVenteDataProduits } from "../../../app/reducers/produit";
import {getTaux, getDevise} from '../../../app/reducers/config';


export default function FacturationHome() {
	const taux = useSelector(getTaux);
	const devise = useSelector(getDevise);
	const assujetti = useSelector(getAssujetti);
	const numFacture = useGetNumFacture();
	const [def, setDef] = useState("");
	const [client, setClient] = useState({});
	const [autreTaxes, setAutreTaxes] = useState("");
	const [addProduits, setAddProduits] = useState(false);
	const [modePay, setModePay] = useState("Cash");
	const [etatFact, setEtatFact] = useState("soldé");
	const [searchingClient, setSearchingClient] = useState(false);
	const [validationErrors, setValidationErrors] = useState({});

	const toggleProduits = React.useCallback(() => {
		const { valid, errors } = validerDefaultValues(
			client,
			def,
			taux,
			devise
		);

		setValidationErrors(errors);

		if (!valid || searchingClient) {
			return;
		}
		setAddProduits(!addProduits);
	}, [addProduits, client, def, devise, searchingClient, taux]);

	const handleChangeClient = React.useCallback((value, loading) => {
		setClient(value);
		setSearchingClient(loading);
	}, []);

	const dispatch = useDispatch();
	const handleSubmitFacture = (data) => {
		const venteData = { ...data };
		venteData.factureRef = numFacture;
		venteData.clientDef = client.numero_def;
		venteData.etat_facture = etatFact;
		venteData.mode_payement = modePay;
		venteData.taux = taux;
		venteData.devise = devise;

		dispatch(nouvelleVente(venteData)).then((res) => {
			const d = res.payload;
			if (d && d.state === "success") {
				setAddProduits(false);
				dispatch(getVenteDataProduits());
				dispatch(actions.setCurrentFacture(d.facture));
			}
		});
	};

	useEffect(() => {
		dispatch(getCurrentFacture());
	}, [dispatch]);

	return (
		<div
			className="home-page"
			style={{ paddingTop: 55, backgroundColor: "#ededed" }}
		>
			{addProduits && (
				<FactureModal
					open={addProduits}
					closeHandler={toggleProduits}
					submitHandler={handleSubmitFacture}
					devise={devise}
					numFacture={numFacture}
					assujetti={assujetti}
				/>
			)}
			<div className="facturation">
				<Default
					handleChangeClient={handleChangeClient}
					setDefValue={setDef}
					autreTaxes={autreTaxes}
					setAutreTaxes={setAutreTaxes}
					clientError={validationErrors.client}
				/>
				<div style={{ width: "100%" }}>
					<div className="facture-details">
						<div className="facturation-block">
							<div className="form-header">
								<Typography
									variant="h2"
									className="block-title"
								>
									Facturation
								</Typography>
								<Typography
									variant="h2"
									className="block-title"
								>
									N° du document : {numFacture}
								</Typography>
							</div>
							<Box
								display="flex"
								alignItems="center"
								justifyContent="space-between"
							>
								<Button
									variant="contained"
									color="primary"
									disableElevation
									onClick={toggleProduits}
								>
									Créer facture
								</Button>
								<Box display="flex" alignItems="center">
									<Typography variant="caption">
										Date:{" "}
										{new Date().toLocaleDateString("fr")}
									</Typography>
								</Box>
							</Box>
						</div>
					</div>
					<FactureRecente />
				</div>
			</div>
		</div>
	);
}
