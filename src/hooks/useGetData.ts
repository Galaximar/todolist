import { getCategories } from "@/api/categories";
import { getTasks } from "@/api/tasks";
import { CategoriesResponse, Task } from "@/api/types";
import { useEffect, useState } from "react";

const createLoadingTasks = (quantity: number) =>
  Array(quantity)
    .fill(0)
    .map((_, i) => ({
      id: `${i}`,
      title: `Cargando ${i}`,
      description: `Cargando ${i}`,
      category_id: "0",
      completed: false,
      loading: true,
    }));
const createCategoriesLoading = (quantity: number): CategoriesResponse =>
  Array(quantity)
    .fill(0)
    .reduce((acc, i) => {
      acc[i] = {
        id: `${i}`,
        name: `Cargando ${i}`,
        color: "#cccccc5c",
      };
      return acc;
    }, {});

const SKELETONS_QUANTITY = 2;
const LOADING_STATE_TASKS = createLoadingTasks(SKELETONS_QUANTITY);
const LOADING_CATEGORIES: CategoriesResponse =
  createCategoriesLoading(SKELETONS_QUANTITY);

const useGetData = () => {
  const [data, setData] = useState<{
    tasks: { completed: Task[]; pending: Task[] };
    categories: CategoriesResponse;
  }>({
    tasks: { completed: LOADING_STATE_TASKS, pending: LOADING_STATE_TASKS },
    categories: LOADING_CATEGORIES,
  });
  useEffect(() => {
    (async () => {
      const [tasks, categories] = await Promise.all([
        getTasks(),
        getCategories(),
      ]);
      if (
        tasks.success &&
        tasks.data &&
        categories.success &&
        categories.data
      ) {
        setData({ tasks: tasks.data, categories: categories.data });
      }
    })();
  }, []);
  return { data, setData };
};
export { useGetData };
