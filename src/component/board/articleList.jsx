import React from "react";

const boards = [
  {
    title: "공지사항 1",
    picture:
      "https://fancytailwind.com/static/profile10-9e05bd5638c669c34c11cb0462d95aa9.jpg",
    author: "이상민",
    link: "#userProfile1",
  },
  {
    title: "공지사항 2",
    picture:
      "https://fancytailwind.com/static/profile17-d76f5656816ea770a4118ba11f135c58.jpg",
    author: "김지수",
    link: "#userProfile2",
  },
  {
    title: "공지사항 3",
    picture:
      "https://fancytailwind.com/static/profile8-34d5f5980ca5030c155a2ffbb50b5802.jpg",
    author: "윤채은",
    link: "#userProfile3",
  },
];

export default function ArticleList() {
  return (
    <div className="mx-auto w-full max-w-5xl bg-white">
      <ul className="flex flex-col">
        {boards.map((board) => (
          <li key={board.title} className="border-b-2 border-gray-100">
            <div
              className={`py-5 px-4 flex justify-between border-l-4 border-transparent bg-transparent 
              hover:border-green-400 hover:bg-gray-200`}
            >
              {/* :USER DETAILS */}
              <div className="sm:pl-4 pr-8 flex sm:items-center">
                {/* ::User Picture */}
                <img
                  src={board.picture}
                  alt=""
                  className="mr-3 w-8 sm:w-12 h-8 sm:h-12 rounded-full"
                />
                {/* ::User Infos */}
                <div className="space-y-1">
                  {/* :::name */}
                  <p className="text-base text-gray-700 font-bold tracking-wide">
                    {board.title}
                  </p>
                </div>
              </div>

              {/* :USER STATUS & BUTTON */}
              <div className="pr-4 flex flex-col justify-between items-end">
                {/* ::User Online Status */}
                {/* ::Details button */}
                <p className="text-sm text-gray-500 font-medium">
                  {board.author}
                </p>
                <a
                  href={board.link}
                  className="text-sm text-gray-500 font-semibold hover:underline hover:text-gray-700"
                >
                  2h ago
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
