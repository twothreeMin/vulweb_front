import React, { useEffect } from "react";

import { useNoticeReqStore } from "../../../store/notice";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

export const NoticeWriter = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 게시글 ID 가져오기

  const { title, content, setTitle, setContent, resetFields } =
    useNoticeReqStore();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    //수정하기 페이지 접근 후 다시 작성페이지 접근 시 내용 남는 이슈 방지
    resetFields();
    // 컴포넌트가 마운트될 때 게시글 데이터 가져오기
    const fetchNoticeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/notice/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error("Error fetching notice:", error);
      }
    };
    if (id) fetchNoticeData(); // 만약 id가 있을 경우(수정 모드일 경우) 데이터를 가져옵니다
  }, [id, setTitle, setContent, token]);

  const addOrEditNoticeSubmit = async (e) => {
    e.preventDefault();

    const url = id
      ? `http://localhost:8080/api/update/notice/${id}`
      : "http://localhost:8080/api/create/notice";

    try {
      const response = await axios.post(
        url,
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201 || response.status === 200) {
        console.log("Notice created successfully:", response.data);
        resetFields();
        navigate("/notice");
      }
    } catch (error) {
      console.error("Error creating notice:", error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl bg-white">
      <form onSubmit={addOrEditNoticeSubmit}>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Default input
            </label>
            <input
              type="text"
              id="title"
              className="bg-gray-50 text-sm border 
              border-gray-400 text-gray-900 
              text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Write a title..."
            />
          </div>
          <div className="px-4 py-2 bg-white rounded-t-lg">
            <label htmlFor="content" className="sr-only">
              content
            </label>
            <textarea
              id="content"
              rows="4"
              className="w-full px-0 text-sm border-gray-400 text-gray-900 bg-white border-0 focus:ring-0"
              placeholder="Write a content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t ">
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs 
              font-medium text-center text-white bg-blue-700 rounded-lg 
              focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
            >
              Post comment
            </button>
            <div className="flex pl-0 space-x-1 sm:pl-2">
              <button
                type="button"
                className="inline-flex justify-center items-center p-2 text-gray-500 rounded 
                cursor-pointer hover:text-gray-900 hover:bg-gray-100"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 12 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                  />
                </svg>
                <span className="sr-only">Attach file</span>
              </button>
              <button
                type="button"
                className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                </svg>
                <span className="sr-only">Set location</span>
              </button>
              <button
                type="button"
                className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
                <span className="sr-only">Upload image</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
