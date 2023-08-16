import { create } from "zustand";

import axios from "axios";

// initial state
const initialState = {
  notices: [],
  isLoading: false,
  error: null,
};

// create() 메서드를 사용하여 상태를 생성합니다
// 게시글 리스트
export const useNoticeListStore = create((set) => ({
  ...initialState, // 초기 상태를 설정합니다
  fetchNotices: async () => {
    try {
      set({ isLoading: true, error: null }); // 로딩 상태를 true로 설정합니다
      const response = await axios.get("http://localhost:8080/api/notices", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      set({ notices: response.data, isLoading: false }); // 데이터를 가져오고 로딩 상태를 false로 설정합니다
    } catch (error) {
      set({ error, isLoading: false }); // 에러를 설정하고 로딩 상태를 false로 설정합니다
    }
  },
}));

// 게시글 전송
export const useNoticeReqStore = create((set) => ({
  title: "",
  content: "",
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  resetFields: () => set({ title: "", content: "" }),
}));

export const useNoticeDetailStore = create((set) => ({
  notice: {},
  error: null,
  isLoading: false,
  fetchNotice: async (id) => {
    try {
      set({ isLoading: true, error: null }); // 로딩 상태를 true로 설정합니다
      const response = await axios.get(
        `http://localhost:8080/api/notice/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      set({ notice: response.data, isLoading: false }); // 데이터를 가져오고 로딩 상태를 false로 설정합니다
    } catch (error) {
      set({ error, isLoading: false }); // 에러를 설정하고 로딩 상태를 false로 설정합니다
      console.error("There was an error fetching the notice:", error);
    }
  },
}));
