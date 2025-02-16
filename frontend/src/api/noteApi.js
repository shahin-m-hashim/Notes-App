import api from "config/axiosConfig";
import useStore from "store/_store";

export const createNewNote = async () => {
  try {
    const { title, content, category, color } =
      useStore.getState().newNoteSlice.form;

    await api.post("/notes", { title, content, category, color });
  } catch (e) {
    if (e.response?.status === 401) useStore.getState().logout();
    throw new Error(e.response?.data?.error || "Unknown error occurred.");
  }
};
