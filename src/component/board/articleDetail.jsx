import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useArticleDetailStore } from "../../store/article";
import { useMemberStore } from "../../store/auth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import moment from "moment";

export const ArticleDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { article, fetchArticle } = useArticleDetailStore();
  const { member } = useMemberStore();

  useEffect(() => {
    fetchArticle(id);
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/delete/article/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Article successfully deleted");
        navigate("/board");
      } else {
        alert("Failed to delete the article");
      }
    } catch (error) {
      console.error("Error deleting the article:", error);
      alert("Error occurred while deleting the article");
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl bg-white p-5">
      <h1 className="text-2xl font-bold mb-4">{article?.title}</h1>
      <div className="text-gray-700">
        <p>Written by: {article?.author}</p>
        <p>
          Date: {moment(article?.createdDate).format("YYYY-MM-DD HH:mm:ss")}
        </p>
      </div>
      <div className="mt-8">
        <p>{article?.content}</p>
      </div>
      {/* 본인이 작성한 글일 경우 수정 및 삭제 버튼을 보여줍니다. */}
      {article?.email === member?.email && (
        <div className="flex justify-end">
          <Link to={`/boardEditor/${id}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 my-2 rounded">
              수정
            </button>
          </Link>
          <button
            className="bg-red-500 hover:bg-red-700 
            text-white font-bold py-2 px-4 mx-2 my-2 rounded"
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};
