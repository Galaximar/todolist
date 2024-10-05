import { FormControl, TextField, Typography } from "@mui/material";
import { ChangeEventHandler } from "react";

interface Props {
  label?: string;
  error?: string;
  name?: string;
  defaultValue?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  validations?: ((...args: (string | number)[]) => {
    isValid: boolean;
    errorMessage?: string;
  })[];
}
const Input = ({ label, error, onChange }: Props) => {
  return (
    <FormControl fullWidth sx={{ position: "relative", pb: "10px" }}>
      <TextField
        size="medium"
        variant="standard"
        error={!!error}
        label={label}
        onChange={onChange}
      />
      {error && (
        <Typography
          sx={{ position: "absolute", bottom: "-10px" }}
          variant="body2"
          color="error"
        >
          {error}
        </Typography>
      )}
    </FormControl>
  );
};

export { Input };
