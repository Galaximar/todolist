import { CategoriesResponse, Task } from "@/api/types";
import { TaskItem } from "@/components/molecules/TaskItem";
import { Box, Typography } from "@mui/material";
import styles from "./index.module.css";

interface Props {
  title: string;
  tasks: Task[];
  categories: CategoriesResponse;
  onUpdateTask: (oldTask: Task, newTask: Task) => Promise<void>;
}

const TasksList = ({ title, tasks, categories, onUpdateTask }: Props) => {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography variant="h6">{title}</Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {tasks.length > 0 ? (
          tasks.map((task, i) => (
            <TaskItem
              key={task.id}
              title={`${categories[task.category_id]?.name}: ${task.title}`}
              task={task}
              onChange={onUpdateTask}
              color={categories[task.category_id]?.color}
              sx={{ animationDelay: `${i <= 10 ? i * 0.1 : 0}s` }}
              className={styles.item}
            />
          ))
        ) : (
          <Typography variant="body1">No hay tareas creadas</Typography>
        )}
      </Box>
    </Box>
  );
};

export { TasksList };
