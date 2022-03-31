import React, { useState, useEffect } from "react";
import {
	Typography,
	TextField,
	RadioGroup,
	Divider,
	CircularProgress,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { NumberFormat, InputRadio, TauxDevise } from "../../../Components";
import { Box } from "@mui/system";
import { compareNumDef, getClientData } from "../utilities/helpers";
import { getAssujetti } from "../../../app/reducers/assujetti";
import { useSelector } from "react-redux";

export default function Default(props) {
	const {
		handleChangeClient,
		autreTaxes,
		setAutreTaxes,
		setDefValue,
		clientError,
	} = props;

	const assujetti = useSelector(getAssujetti);
	const [def, setDef] = useState("");
	const [client, setClient] = useState({});
	const [loadingClient, setLoadingClient] = useState(false);
	const [foundState, setFoundState] = useState("idle");
	const [assujettiError, setAssujettiError] = useState(null);

	const handleChangeInputText = (e) => {
		setDef(e.target.value);
		setDefValue(e.target.value);
	};

	useEffect(() => {
		if (assujetti && compareNumDef(def, assujetti.numero_def)) {
			setAssujettiError("Opération refusée.");
		} else {
			setAssujettiError(null);
		}
		setFoundState("idle");
		setTimeout(() => {
			getClientData(def, assujetti.numero_def, (loading, client, err) => {
				setLoadingClient(loading);

				setClient(client ? client : {});
				handleChangeClient(client, loading);

				if (err) {
					setFoundState("unfound");
					return;
				}

				setFoundState("found");
			});
		}, 200);
	}, [def, assujetti, handleChangeClient]);

	useEffect(() => {
		if (def === "" && foundState !== "idle") {
			setFoundState("idle");
		}
	}, [def, foundState]);

	return (
		<div className="default-values">
			<form>
				<Typography variant="h2" className="block-title">
					Client
				</Typography>
				<Box display="flex" alignItems="center" mb={1.5}>
					<TextField
						variant="outlined"
						label="Numéro DEF"
						value={def}
						onChange={handleChangeInputText}
						placeholder="Numéro DEF du client"
						sx={{ mr: 2 }}
						error={clientError || assujettiError ? true : false}
						helperText={clientError || assujettiError}
					/>
					{loadingClient ? (
						<CircularProgress size={12} color="primary" />
					) : (
						<>
							{foundState === "found" && (
								<CheckCircleIcon
									fontSize="small"
									color="success"
								/>
							)}
							{foundState === "unfound" && (
								<CancelIcon fontSize="small" color="error" />
							)}
						</>
					)}
				</Box>
				<Typography
					variant="caption"
					className="small"
					style={{ display: "block" }}
				>
					Dénomination solciale du client
				</Typography>
				<div className="denomination">
					<Typography variant="caption">
						{client.raison_sociale}
					</Typography>
				</div>
			</form>
			<Divider sx={{ mt: 2, mb: 2 }} />
			<TauxDevise />
			<Divider sx={{ mt: 2, mb: 2 }} />
			<Box mt={2}>
				<Typography variant="h2" className="block-title">
					Taxes
				</Typography>
				<ul className="taxes">
					<li className="taxe">
						<Typography variant="subtitle2" className="small">
							TVA : <span className="tva">16%</span>
						</Typography>
					</li>
					<li className="taxe autre-taxe">
						<Typography variant="subtitle2" className="small">
							Autre taxe :
						</Typography>
						<NumberFormat
							suffix="%"
							value={autreTaxes}
							onChange={(e) => setAutreTaxes(e.target.value)}
							label="Taxe en %"
							maxLength={parseFloat(autreTaxes) > 100 ? 3 : 7}
							error={parseFloat(autreTaxes) > 100}
							helperText={
								parseFloat(autreTaxes) > 100 &&
								"Le pourcentage ne doit pas dépasser 100"
							}
						/>
					</li>
				</ul>
			</Box>
		</div>
	);
}
