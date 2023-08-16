// menuStore.js
import { create } from "zustand";

export const useMenuStore = create((set) => ({
  activeItem: "/",
  setActiveItem: (item) => set({ activeItem: item }),
}));
