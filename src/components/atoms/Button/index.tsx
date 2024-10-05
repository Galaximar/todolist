import ButtonMaterial, { ButtonOwnProps } from "@mui/material/Button";
import { MouseEventHandler } from "react";

interface Props {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  submit?: boolean;
  variant?: ButtonOwnProps["variant"];
  width?: string | number;
}

const Button = ({ submit, label, variant, onClick, width }: Props) => {
  return (
    <ButtonMaterial
      onClick={onClick}
      variant={variant}
      type={submit ? "submit" : "button"}
      size="medium"
      sx={{
        width,
      }}
    >
      {label}
    </ButtonMaterial>
  );
};

export { Button };
