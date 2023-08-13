import React, { useEffect } from "react";
import moment from "moment";
import { useArticleListStore } from "../../../store/article";
import { Link } from "react-router-dom";

// 0:
// author: "이상민"
// authorPicture: "https://lh3.googleusercontent.com/a-/AD_cMMR_JX4Cv8m70YukVQh5h9sfH-cSwr-8vd4b72CUCKjqtHJ8avmtgvs6p36QMKWNvKPOVJGxB3w3WvTqs2zHyo_MmOOcAVnOvVq5C5nillMtqMtkWNHIvah4PBYkJXqxJFezf99N93o84aCXDW3bdCuzemcfAho7WvcqtvRcqusZwFDAkwUWYnRFEKZfpHUFODkQO4yKEXM_iMyxeuITuYEcJ3rmH-HA___sr29C7c9WfwG7oNoBeidZF0Qf6-6afyc3g5aJAG6jYY_hH-2MJdr15ei7OkYf5NqHwDwj4EGd0Eda5RWdFdMbDy2roeDcvF7xwsCXAyAuhZoJWlHIocTPefMgh85xQjbrHF5LcsNpF2mmqaC-ItJoip09usQuTav8Iz8gm1GulKJ1q9uIYPWOhSpXM9vdxyV-t45mlQ46VfYVScZayAjNhmV6A5uSlxx_1O1VOBlbcp20kkogk0-NwoGc3e3PxrC1-5rR85yU-cX1rP_tyfCA5d0IQfiXjqv5KJrK5mkfobSidUtIvVTBVoxRlggDj4mjgkn6FqM2bYa7kn_lXXraDFaE78-oIsu0uAPj5JCm-UjdFNAZz_FlH7MEG85GP3bjhKSf71UzUMe2_bpcGfy2YTYGBH2pmUGv9VyvH9wNtOJevZYTwzoYZWwnsDtpDzM5bAwuTZObELvyH18nM7QyNWMJlwjFmmuT-2cFY4A38ai66p26V35y4D5R_s1P84wwKWQM1psNNc5jcUsaHPEx59mqF4ZSbkfwKD5KR5UUvj4L9l20EC-FV1mgHuXmoUNZNMXRhdq6012WiWrE46p-TCcHkFe1NrzXYxdBceFBqI2OIzTnxv5awzb7xVpG5-t70rTz5yvxxVR5OuHV49WL-Ksyldlq_bSvZemaM14J4zrMNDFRduVwf3hzPg6JmJWDnXDLjaO3nCdMgh5JEkql4d1t0pL1HRs=s96-c"
// comments: []
// content: "test"
// createdDate: "2023-08-13T14:20:41.459872"
// id:  4
// title:  "test"

export const ArticleList = () => {
  const { boards, fetchBoards } = useArticleListStore();

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  console.log("articleList rendering !!! ", boards);

  return (
    <div className="mx-auto w-full max-w-5xl bg-white">
      <ul className="flex flex-col">
        {boards.map((board) => (
          <li key={board.id} className="border-b-2 border-gray-100">
            <Link to={`/article/${board.id}`}>
              <div
                className={`py-5 px-4 flex justify-between border-l-4 border-transparent bg-transparent 
                hover:border-green-400 hover:bg-gray-200`}
              >
                {/* :USER DETAILS */}
                <div className="sm:pl-4 pr-8 flex sm:items-center">
                  {/* ::User Picture */}
                  <img
                    src={board?.authorPicture}
                    alt=""
                    referrerPolicy="no-referrer"
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
                  <p className="text-sm text-gray-500 font-semibold hover:underline hover:text-gray-700">
                    {moment(board.createdDate).fromNow()}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
