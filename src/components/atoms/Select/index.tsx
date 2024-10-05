import { FormControl, InputLabel, MenuItem, Typography } from "@mui/material";
import SelectMaterial, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

interface Props {
  options: { value: string | number; label: string }[];
  label?: string;
  error?: string;
  onChange?: (event: SelectChangeEvent<string>) => void;
  name?: string;
  defaultValue?: string | number;
  required?: boolean;
  validations?: (() => { isVlaid: boolean; errorMessage?: string })[];
}
const Select = ({ label, error, options, onChange }: Props) => {
  const [value, setValue] = useState("");
  return (
    <FormControl
      fullWidth
      size="medium"
      variant="standard"
      sx={{ position: "relative", pb: "10px" }}
    >
      {label && <InputLabel>{label}</InputLabel>}
      <SelectMaterial
        value={value}
        onChange={(e) => {
          if (onChange) onChange(e);
          setValue(e.target.value);
        }}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </SelectMaterial>
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

export { Select };
