import { TextField } from "@mui/material";

export const CustomTextBox = ({
  required = true,
  fullWidth = true,
  id,
  label,
  name,
  autoComplete = true,
  autoFocus = true,
  type = "text",
  defaultValue,
  multiline = false,
  rows = 1,
}) => {
  return (
    <TextField
      margin="normal"
      required={required}
      fullWidth={fullWidth}
      defaultValue={defaultValue}
      id={id}
      label={label}
      name={name}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      type={type}
      multiline={multiline}
      rows={rows}
    />
  );
};
