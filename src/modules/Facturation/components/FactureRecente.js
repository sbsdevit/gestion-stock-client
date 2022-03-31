import React from "react";
import { useSelector } from "react-redux";
import { getTodayFactureRecente } from "../../../app/reducers/facture";
import { Fade, Typography, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import MailIcon from "@mui/icons-material/Mail";
import PrintIcon from "@mui/icons-material/Print";

export default function FactureRecente() {
	const facture = useSelector(getTodayFactureRecente);
	const StyledContainer = styled("div")(() => ({
		marginTop: 30,
		"& > h2": {
			marginBottom: 10,
		},
	}));

	const StyledCard = styled("div")(({ theme }) => ({
		backgroundColor: "#fff",
		borderRadius: 7,
		minWidth: "200px",
		maxWidth: "350px",
		"& > span": {
			padding: theme.spacing(1, 2),
			display: "flex",
			alignItems: "center",
		},
	}));
	const StyledCardHeader = styled("div")(({ theme }) => ({
		display: "flex",
		alignItems: "cente",
		justifyContent: "space-between",
		width: "100%",
		"& > span": {
			padding: theme.spacing(1, 2),
			display: "flex",
			alignItems: "center",
		},
	}));
	const StyledCardBody = styled("div")(({ theme }) => ({
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
		padding: theme.spacing(1, 2),
		display: "flex",
		alignItems: "center",
		"& > ul": {
			"& > li": {
				padding: theme.spacing(0.7, 0),
				minHeight: 32.19,
			},
		},
		"& > ul:first-of-type": {
			marginRight: 20,
		},
	}));
	return (
		<Fade in>
			<StyledContainer>
				<Typography variant="h2">Facture récente</Typography>
				{facture ? (
					<StyledCard>
						<StyledCardHeader>
							<span>
								<Typography variant="caption">
									#{facture.num_facture}
								</Typography>
							</span>
							<span>
								<Typography variant="caption">
									<span>
										{new Date(facture.date).getHours()}
									</span>{" "}
									:
									<span>
										{" "}
										{new Date(facture.date).getMinutes()}
									</span>
								</Typography>
							</span>
							<span>
								<a
									href={`/facture/${facture.num_facture}`}
									rel="noopener noreferrer"
									target="_blank"
								>
									<IconButton>
										<PrintIcon fontSize="small" />
									</IconButton>
								</a>
								<IconButton>
									<MailIcon fontSize="small" />
								</IconButton>
							</span>
						</StyledCardHeader>
						<StyledCardBody>
							<ul>
								<li>Client :</li>
								<li>Quantité :</li>
								<li>T.V.A :</li>
								<li>Net à payer :</li>
								<li>Règlement :</li>
							</ul>
							<ul>
								<li>
									{facture.clientDef
										? facture.clientDef
										: "Non défini"}
								</li>
								<li>{facture.total_quantite}</li>
								<li>
									{facture.total_tva}{" "}
									{facture.devise === "USD" ? "$" : "Fc"}
								</li>
								<li>
									{facture.total_ht + facture.total_tva}{" "}
									{facture.devise === "USD" ? "$" : "Fc"}
								</li>
								<li>{facture.mode_payement}</li>
							</ul>
						</StyledCardBody>
					</StyledCard>
				) : (
					<StyledCard style={{ backgroundColor: "#f9f9f9" }}>
						<StyledCardBody>
							<Typography variant="caption">
								Ici s'affichera la facture récemment établie
							</Typography>
						</StyledCardBody>
					</StyledCard>
				)}
			</StyledContainer>
		</Fade>
	);
}
