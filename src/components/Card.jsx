import React from "react";

const Card = ({ title, icon, count }) => {
  return (
    <div className="rounded-2xl border-2 border-gray-200 bg-white p-5 md:p-6">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl ">
        <span className="text-gray-800 text-2xl">{icon}</span>
      </div>

      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500 ">{title}</span>
          <h4 className="mt-2 font-bold text-gray-800 text-xl ">{count}</h4>
        </div>
      </div>
    </div>
  );
};

export default Card;
