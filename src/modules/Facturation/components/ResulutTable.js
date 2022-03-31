import React from "react";
import { styled } from "@mui/material/styles";
import { formatNumber } from "../../../utilities/helpers";

const StyledTableCell = styled("div")(({ theme }) => ({
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
	padding: "0px 0px 0px 10px",
	fontWeight: 600,
	"&.body": {
		backgroundColor: "#fff",
		display: "flex",
		alignItems: "center",
		border: "1px solid #eaeaea",
		justifyContent: "space-between",
	},
	"&.body > span": {
		fontSize: 13,
		padding: "5px 10px",
		backgroundColor: "#eaeaea",
		minWidth: 43.94
	},
	"&.qt": {
		padding: "5px 10px",
	},
	"&.header": {
		textAlign: "right",
		padding: "5px 0px",
	},
	"&.total": {
		fontSize: 25,
	},
	"&.total.body > span": {
		fontSize: 20,
	},
}));

const StyledTableInputCell = styled("input")(() => ({
	fontSize: 16,
	border: "none",
	outline: "none",
}));

const StyledTableCol = styled("div")(() => ({
	display: "flex",
	flexDirection: "column",
	width: "100%",
	textAlign: "left",
	"&.body": {
		border: "1px solid #eaeaea",
		borderRadius: 5,
		marginLeft: 15,
	},
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

const StyledDisplay = styled("div")(() => ({
	display: "flex",
	alignItems: "center",
	maxWidth: 400,
	"&.total": {
		width: "100%",
		marginTop: 20,
	},
}));

export default function ResultDesplay({
	qT,
	sT,
	tva,
	nP,
	devise,
	remise,
	setRemise,
}) {
	return (
		<>
			<StyledDisplay>
				<StyledTableCol className="header">
					<StyledTableCell className="header">
						Quantité totale
					</StyledTableCell>
					<StyledTableCell className="header">
						Sous-total(H.T)
					</StyledTableCell>
					<StyledTableCell className="header">Rémise</StyledTableCell>
					<StyledTableCell className="header center">
						T.V.A (16%)
					</StyledTableCell>
				</StyledTableCol>
				<StyledTableCol className="body">
					<StyledTableCell className="body qt">{qT}</StyledTableCell>
					<StyledTableCell className="body">
						{formatNumber(sT)}
						<span>{devise}</span>
					</StyledTableCell>
					<StyledTableCell className="body">
						<StyledTableInputCell
							disabled
							value={remise}
							onChange={(e) => setRemise(e.target.value)}
							placeholder="Remise globale (0)"
						/>
						<span>%</span>
					</StyledTableCell>
					<StyledTableCell className="body">
						{formatNumber(tva)}
						<span>{devise}</span>
					</StyledTableCell>
				</StyledTableCol>
			</StyledDisplay>
			<StyledDisplay className="total">
				<StyledTableCol className="header total">
					<StyledTableCell className="header total">
						Net à payer
					</StyledTableCell>
				</StyledTableCol>
				<StyledTableCol className="body total">
					<StyledTableCell className="body total">
						{formatNumber(nP)}
						<span>{devise}</span>
					</StyledTableCell>
				</StyledTableCol>
			</StyledDisplay>
		</>
	);
}
