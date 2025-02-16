import useStore from "store/_store";
import api from "config/axiosConfig";

export const getNotes = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const res = await api.get(`/notes${window.location.search}`);
    return res.data?.data;
  } catch (e) {
    if (e.response?.status === 401) useStore.getState().logout();
    throw new Error(e.response?.data?.error || "Unknown error occurred.");
  }
};
