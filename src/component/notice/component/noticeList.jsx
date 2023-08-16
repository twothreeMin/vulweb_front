import React, { useEffect } from "react";
import moment from "moment";
import { useNoticeListStore } from "../../../store/notice";
import { Link } from "react-router-dom";

export const NoticeList = () => {
  const { notices, fetchNotices } = useNoticeListStore();

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  console.log("noticeList rendering !!! ", notices);

  return (
    <div className="mx-auto w-full max-w-5xl bg-white">
      <ul className="flex flex-col">
        {notices.map((notice) => (
          <li key={notice.id} className="border-b-2 border-gray-100">
            <Link to={`/notice/${notice.id}`}>
              <div
                className={`py-5 px-4 flex justify-between border-l-4 border-transparent bg-transparent 
                hover:border-green-400 hover:bg-gray-200`}
              >
                {/* :USER DETAILS */}
                <div className="sm:pl-4 pr-8 flex sm:items-center">
                  {/* ::User Picture */}
                  <img
                    src={notice?.authorPicture}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="mr-3 w-8 sm:w-12 h-8 sm:h-12 rounded-full"
                  />
                  {/* ::User Infos */}
                  <div className="space-y-1">
                    {/* :::name */}
                    <p className="text-base text-gray-700 font-bold tracking-wide">
                      {notice.title}
                    </p>
                  </div>
                </div>

                {/* :USER STATUS & BUTTON */}
                <div className="pr-4 flex flex-col justify-between items-end">
                  {/* ::User Online Status */}
                  {/* ::Details button */}
                  <p className="text-sm text-gray-500 font-medium">
                    {notice.author}
                  </p>
                  <p className="text-sm text-gray-500 font-semibold hover:underline hover:text-gray-700">
                    {moment(notice.createdDate).fromNow()}
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
