export type Category = {
  id: string;
  name: string;
  color?: string;
};

export type Task = {
  id?: string;
  title: string;
  description?: string;
  category_id: string;
  completed: boolean;
};
export type SuccessResponse<T> = {
  success: boolean;
  data?: T;
};

export type ErrorResponse = {
  success: false;
};
export type CategoriesResponse = { [key: string]: Category };
