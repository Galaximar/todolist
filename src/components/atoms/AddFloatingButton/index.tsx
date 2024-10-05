import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  onClick?: () => void;
}

const AddFloatingButton = ({ onClick }: Props) => {
  return (
    <Fab
      sx={{ position: "sticky", bottom: "10px", left: "100%" }}
      color="primary"
      size="large"
      onClick={onClick}
    >
      <AddIcon />
    </Fab>
  );
};

export { AddFloatingButton };
