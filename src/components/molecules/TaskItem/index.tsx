import { Box, Paper, PaperOwnProps, Typography } from "@mui/material";
import { Checkbox } from "@/components/atoms/Checkbox";
import { Task } from "@/api/types";
import { useState } from "react";

interface Props {
  task: Task & { loading?: boolean };
  title: string;
  onChange: (oldTask: Task, newTask: Task) => Promise<void>;
  color?: string;
  sx?: PaperOwnProps["sx"];
  className?: string;
}

const TaskItem = ({
  task = {
    title: "",
    description: "",
    completed: false,
    category_id: "",
    loading: true,
  },
  title,
  onChange,
  className = "",
  color = "white",
  sx = {},
}: Props) => {
  const [stateChanged, setStateChanged] = useState(false);
  return (
    <Paper
      elevation={6}
      sx={{
        gap: "10px",
        padding: "10px",
        borderRadius: "4px",
        bgcolor: color,
        transition: "scale 0.3s ease-in-out",
        scale: stateChanged ? "0" : "1",
        minHeight: {
          xs: "128px",
          md: "64px",
        },
        display: "flex",
        alignItems: "center",
        ...sx,
      }}
      className={className}
    >
      <Checkbox
        disabled={task.loading}
        initialChecked={task.completed}
        onClick={async (checked) => {
          setStateChanged(true);
          await new Promise((resolve) => setTimeout(resolve, 300));
          setStateChanged(false);
          onChange(task, { ...task, completed: checked });
        }}
      />
      <Box>
        <Typography variant="body1">{title}</Typography>
        {task.description && (
          <Typography variant="body2">{task.description}</Typography>
        )}
      </Box>
    </Paper>
  );
};
export { TaskItem };
