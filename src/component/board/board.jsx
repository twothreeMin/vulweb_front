import { ArticleList } from "./component/articleList";
import { Pagination } from "./component/pagination";
import { Writer } from "./component/writer";

export const Board = () => {
  return (
    <>
      <Writer />
      <ArticleList />
      <Pagination />
    </>
  );
};
