import {
  CategoriesResponse,
  Category,
  ErrorResponse,
  SuccessResponse,
} from "@/api/types";

const getCategories = async () => {
  try {
    const res: Category[] = await fetch(
      "http://localhost:3000/categories"
    ).then((res) => res.json());
    const data = res.reduce<CategoriesResponse>((acc, category) => {
      acc[category.id] = category;
      return acc;
    }, {});
    const response: SuccessResponse<CategoriesResponse> = {
      success: true,
      data,
    };
    return response;
  } catch {
    const error: ErrorResponse = {
      success: false,
    };
    return error;
  }
};

export { getCategories };
