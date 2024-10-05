import {
  DialogContent,
  Dialog as DialogMaterial,
  DialogProps,
  DialogTitle,
  Paper,
} from "@mui/material";

interface Props {
  open: boolean;
  children: JSX.Element | JSX.Element[];
  onClose?: () => void;
  title: string;
  sx?: DialogProps["sx"];
}

const Dialog = ({ open, children, onClose, title, sx }: Props) => {
  return (
    <DialogMaterial sx={sx} onClose={onClose} open={open}>
      <Paper elevation={24}>
        <DialogTitle sx={{ p: "16px 24px" }}>{title}</DialogTitle>
        <DialogContent sx={{ pb: "20px", pl: "24px", pr: "24px" }}>
          {children}
        </DialogContent>
      </Paper>
    </DialogMaterial>
  );
};
export { Dialog };
