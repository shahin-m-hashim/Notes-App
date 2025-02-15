import { create } from "zustand";
import createAuthSlice from "store/authSlice";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT || "development";

const useStore = create(
  devtools(
    immer((set, get) => ({
      ...createAuthSlice(set, get),
    })),
    {
      name: "store",
      enabled: ENVIRONMENT === "development",
    }
  )
);

export default useStore;
