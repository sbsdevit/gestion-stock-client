import React from "react";
import { Button, Typography } from "@mui/material";

export default function FactureForm(props) {
	return (
		<div>
			<div className="form-header">
				<Typography variant="h2" className="block-title">
					Facture
				</Typography>
				<Typography variant="h2" className="block-title">
					N° ........
				</Typography>
			</div>
			<div className="horizontal-align facturation-block">
				<Button variant="outlined" color="default" disableElevation>
					Annuler
				</Button>
				<Button variant="contained" color="primary" disableElevation>
					Enregistrer
				</Button>
			</div>
            <div>
                <Button
                    variant="outlined"
                    color="primary"
                    disableElevation
                >
                    Ajouter produits
                </Button>
            </div>
		</div>
	);
}
