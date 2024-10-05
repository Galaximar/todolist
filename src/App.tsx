import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { AddFloatingButton } from "@/components/atoms/AddFloatingButton";
import { useState } from "react";
import { createTask, updateTask } from "@/api/tasks";
import { TasksList } from "@/components/organisms/TasksList";
import { useGetData } from "./hooks/useGetData";
import { Task } from "@/api/types";
import { CreateTaskFormDialog } from "@/components/organisms/CreateTaskFormDialog";
import completedToSring from "@/utils/dicts/completedToSring";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const theme = createTheme({});

function App() {
  const [openDialog, setOpenDialog] = useState(false);
  const { data, setData } = useGetData();

  const handleSubmit = async (formState: {
    title: string;
    description: string;
    category: string;
  }) => {
    const newTask = await createTask({
      title: formState.title,
      description: formState.description,
      category_id: formState.category,
      completed: false,
    });
    if (newTask.success) {
      setData({
        ...data,
        tasks: {
          ...data.tasks,
          pending: [...data.tasks.pending, newTask.data],
        },
      });
      setOpenDialog(false);
    }
  };

  const handleUpdateTask = async (oldTask: Task, newTask: Task) => {
    const updatedTask = await updateTask(newTask);

    if (updatedTask.success) {
      const oldStatus = completedToSring(oldTask.completed);
      const newStatus =
        oldTask.completed !== updatedTask.data.completed
          ? completedToSring(updatedTask.data.completed)
          : oldStatus;
      // Change status
      if (newStatus !== oldStatus) {
        setData({
          ...data,
          tasks: {
            ...data.tasks,
            [newStatus]: [...data.tasks[newStatus], updatedTask.data],
            [oldStatus]: data.tasks[oldStatus].filter(
              (t) => t.id !== updatedTask.data.id
            ),
          },
        });
        // Update task
      } else {
        const tasks = [...data.tasks[oldStatus]];
        const index = tasks.findIndex((t) => t.id === updatedTask.data.id);
        tasks[index] = updatedTask.data;
        setData({
          ...data,
          tasks: {
            ...data.tasks,
            [oldStatus]: tasks,
          },
        });
      }
    }
  };

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Container
          sx={{
            maxWidth: "md",
            p: 3,
            pt: "64px",
            pb: "40px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography pb={"17px"} variant="h3">
            Lista de tareas
          </Typography>
          <Box display="flex" flexDirection="column" gap={4}>
            <TasksList
              title="Pendientes"
              categories={data.categories}
              tasks={data.tasks.pending}
              onUpdateTask={handleUpdateTask}
            />
            <TasksList
              title="Terminadas"
              categories={data.categories}
              tasks={data.tasks.completed}
              onUpdateTask={handleUpdateTask}
            />
          </Box>
          <AddFloatingButton onClick={() => setOpenDialog(!openDialog)} />
          <CreateTaskFormDialog
            openDialog={openDialog}
            categories={data.categories}
            onClose={() => setOpenDialog(false)}
            onSubmit={handleSubmit}
          />
        </Container>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
