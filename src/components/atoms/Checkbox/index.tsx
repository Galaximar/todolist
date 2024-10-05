import { useState } from "react";
import CheckboxMaterial from "@mui/material/Checkbox";

interface Props {
  disabled?: boolean;
  initialChecked?: boolean;
  onClick?: (checked: boolean) => void;
}

const Checkbox = ({ onClick, disabled, initialChecked }: Props) => {
  const [checked, setChecked] = useState(initialChecked);
  return (
    <CheckboxMaterial
      disabled={disabled}
      color="primary"
      size="medium"
      checked={checked}
      onClick={() => {
        if (onClick) onClick(!checked);
        setChecked(!checked);
      }}
    />
  );
};

export { Checkbox };
