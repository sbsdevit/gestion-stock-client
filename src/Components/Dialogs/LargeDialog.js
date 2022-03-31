import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

export default function LargeDialog({
	title,
	message,
	onAgree,
	disagreeBtnText,
	agreeBtnText,
	onDisagree,
	open,
	onClose,
	color
}) {
	return (
		<div>
			<Dialog
				open={open}
				onClose={onClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-message"
				color={color}
				sx={{
					"& .MuiDialog-container": {
						alignItems: 'baseline',
					},
					"& h2": {
						fontSize: 18,
						padding: '7px 10px'
					},
					"& .MuiDialogContent-root": {
						padding: '7px 10px',
					},
					"& p": {
						fontSize: 14
					},
				}}
			>
				<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-message">
                        {message}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
                    {disagreeBtnText &&
                        <Button onClick={onDisagree}>{disagreeBtnText}</Button>
                    }
                    {agreeBtnText &&
                        <Button onClick={onAgree} autoFocus>
                            {agreeBtnText}
                        </Button>
                    }
				</DialogActions>
			</Dialog>
		</div>
	);
}
