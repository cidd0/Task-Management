import React from "react";

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard;
