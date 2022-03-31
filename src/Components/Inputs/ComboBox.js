import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function ComboBox({
	options,
	label,
	minWidth,
	value,
	setValue,
	placeholder,
	textFieldXs,
	error,
	helperText,
	sx,
	disabled
}) {
	return (
		<Autocomplete
			id="combo-box"
			sx={{ minWidth: minWidth ? minWidth : 300, ...sx }}
			disabled={disabled}
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue);
			}}
			options={options || []}
			isOptionEqualToValue={(option, value) => option.id === value.id}
			autoHighlight
			getOptionLabel={(option) => option.label}
			renderInput={(params) => (
				<TextField
					placeholder={placeholder || ""}
					{...params}
					label={label}
					sx={textFieldXs}
					error={error}
					helperText={helperText}
				/>
			)}
		/>
	);
}

export default React.memo(ComboBox);
