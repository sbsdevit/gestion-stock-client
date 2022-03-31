import React, { useState } from "react";
import { styled } from "@mui/material/styles";

export const StyledTableCell = styled("div")(({ theme }) => ({
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
	[`&.header`]: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,
		padding: "5px 2px",
	},
	[`&.body:not(:last-child)`]: {
		fontSize: 16,
		border: "1px solid #eaeaea",
		padding: "4px 10px",
	},
	[`&.right`]: {
		textAlign: "right",
	},
	[`&.left`]: {
		textAlign: "left",
	},
	[`&.center`]: {
		textAlign: "center",
	},
}));

export const StyledTableInputCell = styled("input")(({ theme }) => ({
	fontSize: 16,
	padding: "6px 10px",
	border: "1px solid #eaeaea",
	outline: "none",
}));

export const StyledTableRow = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	width: "100%",
	textAlign: "left",
	"&.header": {
		backgroundColor: `${theme.palette.primary.main}!important`,
	},
	"&:last-child td, &:last-child th": {
		border: 0,
	},
	"&>*": {
		width: "25%",
	},
	"&>div:first-of-type ": {
		width: "40%",
	},
	"&>div:last-child": {
		width: "fit-content",
	},
	"&.body > div:first-of-type > div > div": {
		padding: "2px 6px",
	},
}));

export const InputQuantite = ({
	produit,
	produits,
	onChange,
	singleValue,
	onSingleChange,
	...other
}) => {
	const [value, setValue] = useState(0);
	const handleChange = (e) => {
		const v = parseFloat(
			e.target.value > 0
				? e.target.value
				: 0
		);
		if (produit && e.target.value >= 0) {
			const p = produits.find((prod) => prod.id === produit.id);
			if (p && v > p.quantite) {
				return;
			}
			setValue(e.target.value);
			if (typeof onChange === "function") {
				onChange(produit.id, v);
			}
			if (typeof onSingleChange === "function") {
				onSingleChange(v);
			}
		}
	};
	React.useEffect(() => {
		if (produit) {
			setValue(produit.quantiteSortie);
		}
	}, [produit]);
	React.useEffect(() => {
		if ((singleValue !== null || singleValue !== undefined) && !produit) {
			setValue(singleValue);
		}
	}, [produit, singleValue]);
	return (
		<StyledTableInputCell
			{...other}
			inputMode="numeric"
			type="number"
			value={value}
			maxLength={10}
			onChange={handleChange}
		/>
	);
};
