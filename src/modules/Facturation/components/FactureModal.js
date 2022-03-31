import React, { useEffect, useState } from "react";
import {
	Typography,
	Modal,
	Divider,
	Button,
	CircularProgress,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector, useDispatch } from "react-redux";
import {
	selectAll as selectProduits,
	getVenteDataProduits,
} from "../../../app/reducers/produit";
import { getReqState } from "../../../app/reducers/vente";
import ResultDesplay from "./ResulutTable";
import { SearchInput, ComboBox, LargeDialog } from "../../../Components";
import { Box } from "@mui/system";
import {
	StyledTableCell as ProduitListStyledCell,
	StyledTableRow as ProduitListStyledRow,
} from "./ProduitListStyledComponents";
import {
	StyledTableCell as SelectedProduitTableCell,
	StyledTableRow as SelectedProduitTableRow,
	InputQuantite,
} from "./SelectedProduitStyledComponents";
import { validerVente } from "../utilities/validators";
import { calculeFacture, fifo } from "../utilities/helpers";
import { formatNumber } from "../../../utilities/helpers";

export default function ProduitModal({
	open,
	closeHandler,
	submitHandler,
	numFacture,
	devise,
	assujetti,
}) {
	// Global variables
	let produits = useSelector(selectProduits);
	const [notSelected, setNotSelected] = useState(produits);
	const [selectedProduits, setSelectedProduits] = useState([]);
	const [qT, setQT] = useState(0);
	const [sT, setST] = useState(0);
	const [tva, setTva] = useState(0);
	const [nP, setNP] = useState(0);
	const [produitVenteStock, setProduitVenteStock] = useState([]);
	const [canContinue, setCanContinue] = useState({
		alert: false,
		message: ""
	});
	const [remise, setRemise] = useState(0);
	const [validationError, setValidationError] = useState(null);
	const saving = useSelector(getReqState) === "loading";

	// Selected produits states / variables
	const [produitValue, setProduitValue] = useState(null);
	const [qValue, setQValue] = useState(0);
	const [pTotal, setPTotal] = useState(0);

	const handleCloseClick = () => {
		setSelectedProduits([]);
		closeHandler();
	};

	const handleCloseAlert = () => {
		setCanContinue(true);
	};

	const onSubmit = () => {
		if (saving) {
			return;
		}

		const { valid, error } = validerVente(selectedProduits);

		setValidationError(error);

		if (!valid) {
			return;
		}

		const data = {
			facture: {
				net_payer: nP,
				tva: tva,
			},
			ventes: selectedProduits.map((sP) => ({
				q_sortie: sP.quantiteSortie,
				prix_unitaire: sP.prixTot / sP.quantiteSortie,
				tva: sP.prixTot * 0.16,
				produitId: sP.id,
				venteStock: sP.venteStock,
			})),
		};

		submitHandler(data);
	};

	// Product list functions
	const handleSelectFromProduitList = (produit) => {
		if (produit.quantite === 0) {
			setCanContinue({
				alert: true,
				message: "Le stock est épuisé!"
			});
			return;
		}
		const p = { ...produit, quantiteSortie: 0, prixTot: 0, venteStock: [] };
		let newProds = [...selectedProduits, p];
		const prod = selectedProduits.find((p) => p.id === produit.id);
		if (prod) {
			if (prod.quantiteSortie >= produit.quantite) {
				setCanContinue({
					alert: true,
					message: "Le stock est épuisé!"
				});
				return;
			}

			prod.quantiteSortie = prod.quantiteSortie + 1;
			const { prixTotal, entreeSortie } = fifo(
				prod.entrees,
				prod.quantiteSortie
			);
			prod.prixTot = prixTotal;
			prod.venteStock = entreeSortie;
			const { q, sousTotal, tva, netAPayer } =
				calculeFacture(selectedProduits);
			setQT(q);
			setST(sousTotal);
			setTva(tva);
			setNP(netAPayer);
			newProds = [
				...selectedProduits.filter((p) => p.id !== prod.id),
				{ ...prod },
			];
		}

		setSelectedProduits(newProds);

		const nS = notSelected.filter((p) => p.id !== produit.id);
		setNotSelected(nS);
	};
	
	const handleRemoveProduit = (index) => {
		let newProduitsList = [];

		if (index || index === 0) {
			const p = selectedProduits.find((_, i) => i === index);
			if (p) {
				setNotSelected([...notSelected, p]);
			}
			newProduitsList = selectedProduits.filter((_, i) => i !== index);
		}
		setSelectedProduits(newProduitsList);
	};
	const handleProduitValueChange = (produit) => {
		if (produit.quantite === 0 || produit.quantite < produit.q_min) {
			return;
		}

		if (produit) {
			setProduitValue({
				...produit,
				quantiteSortie: parseFloat(qValue),
				prixTot: 0,
				venteStock: [],
			});
		} else {
			setProduitValue(null);
		}
	};

	const handleQuantiteChange = (produitId, value) => {
		const produit = produits.find(prod => prod.id === produitId);
		const v = parseFloat(value);
		if (v > produit.quantite) {
			setCanContinue({
				alert: true,
				message: "Le stock est épuisé!"
			});
			return;
		}
		const p = selectedProduits.find((prod) => prod.id === produitId);
		if (p) {
			p.quantiteSortie = v;
			const { prixTotal, entreeSortie } = fifo(
				p.entrees,
				p.quantiteSortie
			);
			p.prixTot = prixTotal;
			p.venteStock = entreeSortie;
			const { q, sousTotal, tva, netAPayer } =
				calculeFacture(selectedProduits);
			setQT(q);
			setST(sousTotal);
			setTva(tva);
			setNP(netAPayer);
		}
	};

	const handleAppendProduit = (e) => {
		e.preventDefault();
		if (produitValue) {
			if (qValue > 0) {
				setSelectedProduits([
					...selectedProduits,
					{
						...produitValue,
						quantiteSortie: parseFloat(qValue),
						prixTot: pTotal,
						venteStock: produitVenteStock,
					},
				]);

				setProduitValue(null);
				const nS = notSelected.filter((p) => p.id !== produitValue.id);
				setNotSelected(nS);
				setQValue(0);
				setPTotal(0);
			}
		}
	};

	const dispatch = useDispatch();
	useEffect(() => {
		if (produits.length === 0 && assujetti) {
			dispatch(getVenteDataProduits(assujetti.id));
			setNotSelected(produits);
		}
	}, [assujetti, dispatch]);

	useEffect(() => {
		if (produitValue) {
			const { prixTotal, entreeSortie } = fifo(
				produitValue.entrees,
				parseFloat(qValue)
			);
			setPTotal(prixTotal);
			setProduitVenteStock(entreeSortie);
		}
	}, [produitValue, qValue]);

	useEffect(() => {
		const { q, sousTotal, tva, netAPayer } =
			calculeFacture(selectedProduits);
		setQT(q);
		setST(sousTotal);
		setTva(tva);
		setNP(netAPayer);
	}, [selectedProduits]);
	return (
		<Modal open={open} onClose={closeHandler}>
			<div className="content-container">
				{canContinue.alert && (
					<LargeDialog
						open={canContinue.alert}
						title="Alerte stock"
						message={canContinue.message || "Stock de sécurité déjà atteint. Produit indisponible."}
						agreeBtnText="Ok"
						onClose={handleCloseAlert}
						onAgree={handleCloseAlert}
					/>
				)}
				{validationError && (
					<LargeDialog
						open={validationError ? true : false}
						title="Erreur"
						color="warning"
						message={validationError}
						agreeBtnText="Ok"
						onClose={() => setValidationError(null)}
						onAgree={() => setValidationError(null)}
					/>
				)}
				<header>
					<Typography>Facture {numFacture}</Typography>
					<Box display="flex" alignItems="center">
						<Button
							variant="contained"
							color="primary"
							disableElevation
							onClick={onSubmit}
							sx={{
								minWidth: 113.19,
								height: 36.5,
								mr: 2,
							}}
						>
							{saving ? (
								<CircularProgress size={12} color="inherit" />
							) : (
								"Enregistrer"
							)}
						</Button>
						<Button
							variant="outlined"
							color="default"
							disableElevation
							disabled={saving}
							onClick={handleCloseClick}
						>
							Annuler
						</Button>
					</Box>
				</header>
				<div className="inner-facturation-content">
					<div className="produits-side">
						<SearchInput />
						<div className="product-list">
							<Typography variant="caption" className="small">
								Ces produits se trouvent dans le{" "}
								<strong>stock principal</strong>.
							</Typography>
							<Divider sx={{ mt: 2 }} />
							<div className="produits-list">
								<ProduitListStyledRow className="header">
									<ProduitListStyledCell className="header">
										Produit
									</ProduitListStyledCell>
									<ProduitListStyledCell className="header">
										Prix unitaire
									</ProduitListStyledCell>
									<ProduitListStyledCell className="header center">
										Disponible
									</ProduitListStyledCell>
									<ProduitListStyledCell className="header center"></ProduitListStyledCell>
								</ProduitListStyledRow>
								{produits.map((produit) => (
									<ProduitListStyledRow
										key={produit.id}
										onClick={() =>
											handleSelectFromProduitList(produit)
										}
									>
										<ProduitListStyledCell className="body">
											{produit.designation}
										</ProduitListStyledCell>
										<ProduitListStyledCell className="body right"></ProduitListStyledCell>
										<ProduitListStyledCell className="body center">
											{produit.quantite}
										</ProduitListStyledCell>
										<ProduitListStyledCell className="body">
											{produit.unite}
										</ProduitListStyledCell>
									</ProduitListStyledRow>
								))}
							</div>
						</div>
					</div>
					<div className="produits-side">
						<div className="selected-products">
							<SelectedProduitTableRow className="header">
								<SelectedProduitTableCell className="header">
									Produit
								</SelectedProduitTableCell>
								<SelectedProduitTableCell className="header">
									Quantité
								</SelectedProduitTableCell>
								<SelectedProduitTableCell className="header">
									Prix total
								</SelectedProduitTableCell>
								<SelectedProduitTableCell className="header center">
									<Button
										tabIndex={1000}
										size="small"
										disableElevation
										variant="contained"
										sx={{
											borderRadius: 0,
											minWidth: "50px",
										}}
										color="primary"
										onClick={() => handleRemoveProduit()}
									>
										<DeleteOutlineIcon fontSize="small" />
									</Button>
								</SelectedProduitTableCell>
							</SelectedProduitTableRow>
							{selectedProduits.map((produit, index) => (
								<SelectedProduitTableRow
									className="body"
									key={`${produit.id}_${index}`}
								>
									<SelectedProduitTableCell className="body">
										{produit.code_produit}
									</SelectedProduitTableCell>
									<InputQuantite
										produit={produit}
										produits={produits}
										sx={{ m: 0 }}
										type="multiple"
										onChange={handleQuantiteChange}
									/>
									<SelectedProduitTableCell className="body">
										{formatNumber(produit.prixTot)}
									</SelectedProduitTableCell>
									<SelectedProduitTableCell className="body">
										<Button
											tabIndex={index + produits.length}
											size="small"
											disableElevation
											variant="contained"
											sx={{
												borderRadius: 0,
												minWidth: "50px",
											}}
											color="primary"
											onClick={() =>
												handleRemoveProduit(index)
											}
										>
											<DeleteOutlineIcon fontSize="small" />
										</Button>
									</SelectedProduitTableCell>
								</SelectedProduitTableRow>
							))}
							<form onSubmit={handleAppendProduit}>
								<SelectedProduitTableRow className="body new">
									<ComboBox
										minWidth="40%"
										value={produitValue}
										setValue={handleProduitValueChange}
										options={notSelected.map((prod) => ({
											label: prod.designation,
											...prod,
										}))}
										textFieldXs={{
											padding: 0,
											margin: 0,
										}}
									/>
									<InputQuantite
										produit={produitValue}
										singleValue={qValue}
										produits={produits}
										onSingleChange={(value) =>
											setQValue(value)
										}
										sx={{ m: 0 }}
									/>
									<SelectedProduitTableCell className="body">
										{formatNumber(pTotal)}
									</SelectedProduitTableCell>
									<SelectedProduitTableCell className="body">
										<Button
											tabIndex={1000}
											size="small"
											disableElevation
											variant="contained"
											type="submit"
											sx={{
												borderRadius: 0,
												minWidth: "50px",
											}}
											color="primary"
										>
											<CheckIcon fontSize="small" />
										</Button>
									</SelectedProduitTableCell>
								</SelectedProduitTableRow>
							</form>
						</div>
						<Box
							mt={3}
							display="flex"
							alignItems="flex-end"
							flexDirection="column"
						>
							<ResultDesplay
								qT={qT}
								sT={sT}
								tva={tva}
								nP={nP}
								devise={devise}
								remise={remise}
								setRemise={setRemise}
							/>
						</Box>
					</div>
				</div>
			</div>
		</Modal>
	);
}
