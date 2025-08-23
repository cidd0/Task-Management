import React from "react";
import SideNav from "./SideNav.jsx";
import TopNav from "./TopNav.jsx";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideNav />
      <main className="flex-1 flex flex-col">
        <TopNav />
        <div className="flex-1 overflow-y-auto p-6 bg-white">
            {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
