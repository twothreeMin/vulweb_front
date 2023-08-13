import { Link } from "react-router-dom";

export const EditorButton = () => {
  return (
    <div className="flex flex-row-reverse">
      <Link to="/boardEditor">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-9 my-2 rounded">
          글 작성
        </button>
      </Link>
    </div>
  );
};
