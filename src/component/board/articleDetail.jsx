import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useArticleDetailStore } from "../../store/article";

import moment from "moment";

export const ArticleDetail = () => {
  const { id } = useParams();
  const { article, fetchArticle } = useArticleDetailStore();

  useEffect(() => {
    fetchArticle(id);
  }, [id, fetchArticle]);

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
    </div>
  );
};
