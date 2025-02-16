import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import createAuthSlice from "store/authSlice";
import createNotesSlice from "store/notesSlice";
import createNewNoteSlice from "store/newNoteSlice";

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT || "development";

const useStore = create(
  devtools(
    immer((set, get) => ({
      ...createAuthSlice(set, get),
      ...createNotesSlice(set, get),
      ...createNewNoteSlice(set, get),
    })),
    {
      name: "store",
      enabled: ENVIRONMENT === "development",
    }
  )
);

export default useStore;
