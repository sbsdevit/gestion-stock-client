import React, { useState } from "react";
import "./Topbar.css";
import Box from "@mui/material/Box";
import { styled } from "@mui/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Link } from "react-router-dom";
import {
	Avatar,
	IconButton,
	Typography,
	useTheme,
	Button,
	Divider,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StockIcon from "@mui/icons-material/Inventory";
import CommandIcon from "@mui/icons-material/LocalGroceryStore";
import VenteIcon from "@mui/icons-material/Receipt";
import CpteIcon from "@mui/icons-material/CreditCard";
import PartenairesIcon from "@mui/icons-material/Groups";
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from "@mui/icons-material/Apps";
import { useSelector } from "react-redux";
import { getUser, getAssujetti } from "../../app/reducers/assujetti";
import { getLoginRedirectUrl } from "../../utilities/helpers";

export default function Topbar() {
	const user = useSelector(getUser);
	const assujetti = useSelector(getAssujetti);
	const theme = useTheme();
	const [openMenu, setOpenMenu] = useState(false);

	const toggleMenu = (event) => {
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setOpenMenu(!openMenu);
	};

	return (
		<div
			className="appbar"
			style={{
				backgroundColor: theme.palette.grey[200],
				padding: theme.spacing(1, 2),
				borderBottom: "2px solid " + theme.palette.primary.light,
			}}
		>
			<Box display="flex" alignItems="center">
				<IconButton sx={{ mr: 2 }} onClick={toggleMenu}>
					<AppsIcon fontSize="small" />
				</IconButton>
				{openMenu && (
					<MainAppMenu open={openMenu} toggleMenu={toggleMenu} assujetti={assujetti} />
				)}
				<Typography
					color="primary"
					variant="h1"
					sx={{ fontWeight: 500 }}
				>
					DEF | RDC
				</Typography>
			</Box>
			<User theme={theme} user={user} />
		</div>
	);
}

// Le composant utilisateur
const User = ({ user }) => {
	return (
		<div className="user">
			<Avatar style={{ width: 25, height: 25, color: "#000" }} />
			<div className="user-detailes">
				<Typography variant="caption">
					{user && <span>{user.prenom}</span>}
				</Typography>
			</div>
			<ArrowDropDownIcon fontSize="small" color="inherit" />
		</div>
	);
};

const StyledMainMenuHeader = styled("div")(() => ({
	position: 'relative',
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
}));

const StyledContentContainer = styled("div")(() => ({
	width: 300,
	padding: "20px 10px",
}));

const StyledMenuList = styled("div")(() => ({
	display: 'flex',
	flexDirection: 'column',
	padding: '20px 0'
}));

const StyledMenuCard = styled("div")(({theme}) => ({
	padding: "10px 7px",
	display: 'flex',
	alignItems: 'center',
	cursor: 'pointer',
	width: 'fit-content',
	borderRadius: 5,
	transition: 'all .2s',
	"&:not(:last-child)": {
		marginBottom: 7,
	},
	"& > svg": {
		marginRight: 10
	},
	"& > span": {
		fontSize: 14
	},
	"&.menu-card:hover": {
		boxShadow: theme.shadows[1],
		padding: "10px 20px",
	}
}));

const StyledFooter = styled('div')(() => ({
	position: 'absolute',
	bottom: 0,
	left: 0,
	right: 0,
	"& > .copy-right": {
		display: 'block',
		fontSize: 14,
		padding: '15px 10px',
	}
}));

// Drop down Menu principal
const MainAppMenu = ({ open, assujetti, toggleMenu }) => {
	return (
		<SwipeableDrawer
			anchor={"left"}
			open={open}
			onClose={toggleMenu}
			onOpen={toggleMenu}
			BackdropProps={{
				style: {
					backgroundColor: 'rgba(0, 0, 0, 0)'
				}
			}}
		>
			<StyledContentContainer>
				<StyledMainMenuHeader>
					<IconButton sx={{ mr: 2 }} onClick={toggleMenu}>
						<AppsIcon fontSize="small" />
					</IconButton>
					<a href={getLoginRedirectUrl()}>
						<Button
							endIcon={<ArrowForwardIcon />}
							color="primary"
							variant="text"
						>
							Accueil
						</Button>
					</a>
				</StyledMainMenuHeader>
				<Box>
					<StyledMenuList>
						<Typography variant="h1" sx={{mb: 3, fontWeight: 600, pl: 1}}>Modules du DEF</Typography>
						<StyledMenuCard className="menu-card">
							<CommandIcon color="success" />
							<Typography variant="caption">
								Gestion des commandes
							</Typography>
						</StyledMenuCard>
						<Link to="/stock" target="_blank">
							<StyledMenuCard className="menu-card">
								<StockIcon color="secondary" />
								<Typography variant="caption">
									Gestion des stocks
								</Typography>
							</StyledMenuCard>
						</Link>
						<Link to="/facturation" target="_blank">
							<StyledMenuCard className="menu-card">
								<VenteIcon color="default" />
								<Typography variant="caption">
									Vente et facturation
								</Typography>
							</StyledMenuCard>
						</Link>
						<StyledMenuCard className="menu-card">
							<CpteIcon color="primary" />
							<Typography variant="caption">
								Comptabilité et caisse
							</Typography>
						</StyledMenuCard>
						<StyledMenuCard className="menu-card">
							<PartenairesIcon color="info" />
							<Typography variant="caption">
								Partenaires de commerce
							</Typography>
						</StyledMenuCard>
					</StyledMenuList>
				</Box>
			</StyledContentContainer>
			<StyledFooter>
				<StyledMenuCard>
					<SettingsIcon color="info" />
					<Typography variant="caption">
						{assujetti.raison_sociale}
					</Typography>
				</StyledMenuCard>
				<Divider />
				<Typography variant="caption" className="copy-right" color="GrayText">&copy; DGI RDC tous droits reservés.</Typography>
			</StyledFooter>
		</SwipeableDrawer>
	);
};
