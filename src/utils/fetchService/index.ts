import { errorToast } from "@/utils/toast";

const baseURL = import.meta.env.VITE_API_URL;

const getMethod = async (url: string) => {
  try {
    const res = await fetch(`${baseURL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (error) {
    errorToast((error as Error).message);
    throw new Error((error as Error).message);
  }
};
const postMethod = async (url: string, body: unknown) => {
  try {
    const res = await fetch(`${baseURL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body || {}),
    });
    return res.json();
  } catch (error) {
    errorToast((error as Error).message);
    throw new Error((error as Error).message);
  }
};
const putMethod = async (url: string, body: unknown) => {
  try {
    const res = await fetch(`${baseURL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body || {}),
    });
    return res.json();
  } catch (error) {
    errorToast((error as Error).message);
    throw new Error((error as Error).message);
  }
};
const deleteMethod = async (url: string, body: unknown) => {
  try {
    const res = await fetch(`${baseURL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body || {}),
    });
    return res.json();
  } catch (error) {
    errorToast((error as Error).message);
    throw new Error((error as Error).message);
  }
};

const fetchService = {
  get: getMethod,
  post: postMethod,
  put: putMethod,
  delete: deleteMethod,
};
export default fetchService;
