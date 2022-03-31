import { styled } from "@mui/material/styles";
import {ButtonBase} from '@mui/material';

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
	padding: "10px 10px",
	[`&.header`]: {
		backgroundColor: theme.palette.primary.light,
		color: theme.palette.common.white,
        padding: "5px 10px",
	},
	[`&.body`]: {
		fontSize: 16,
        padding: "10px 10px",
	},
	[`&.right`]: {
        textAlign: 'right'
	},
	[`&.left`]: {
        textAlign: 'left'
	},
	[`&.center`]: {
        textAlign: 'center'
	},
}));

export const StyledTableRow = styled(ButtonBase)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    "&.header": {
		backgroundColor: `${theme.palette.primary.light}!important`,
    },
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.grey[100],
        boxShadow: '0px 1px 0px 0px rgb(0 0 0 / 20%)'
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
	"&:hover": {
		backgroundColor: theme.palette.action.focus,
	},
	"&>div": {
		width: "25%",
	},
	"&>div:first-of-type": {
		width: "40%",
	},
	"&>div:last-child": {
		width: "10%",
	},
}));
