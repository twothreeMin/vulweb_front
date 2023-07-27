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

export const useMemberStore = create((set) => ({
  member: null,
  setMember: (value) => set({ member: value }),
  fetchMemberInfo: async (token) => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8080/api/member/info",
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      });

      if (response.data) {
        set({
          member: {
            name: response.data.nickname,
            email: response.data.email,
            picture_url: response.data.picture_url,
            authority: response.data.authority,
          },
        });

        console.log("useMemberStore!!", response.data);
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error(error);
    }
  },
}));
