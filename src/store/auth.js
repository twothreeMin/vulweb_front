import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
  isAuthenticated: null,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  checkAuth: async () => {
    try {
      const response = await axios.get("/api/token/isAuthenticated", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      set({ isAuthenticated: response.data.isAuthenticated });
    } catch (error) {
      set({ isAuthenticated: false });
    }
  },
}));
