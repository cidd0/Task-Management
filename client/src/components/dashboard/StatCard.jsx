import React from "react";


const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-4 shadow">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex items-center gap-2">
        {Icon && <Icon className="text-3xl text-black" />}
        <p className="text-2xl font-bold">{value}</p>
      </div>
      
      
      
    </div>
  );
};

export default StatCard;
