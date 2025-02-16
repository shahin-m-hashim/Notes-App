import useStore from "store/_store";
import api from "config/axiosConfig";

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

export const editNote = async () => {
  try {
    const editForm = useStore.getState().editNoteSlice.form;

    await api.put(`/notes/${editForm.id}`, {
      title: editForm.title,
      color: editForm.color,
      content: editForm.content,
      category: editForm.category,
    });
  } catch (e) {
    if (e.response?.status === 401) useStore.getState().logout();
    throw new Error(e.response?.data?.error || "Unknown error occurred.");
  }
};

export const pinNote = async (id) => {
  try {
    await api.patch(`/notes/${id}/pin`);
  } catch (e) {
    if (e.response?.status === 401) useStore.getState().logout();
    throw new Error(e.response?.data?.error || "Unknown error occurred.");
  }
};
