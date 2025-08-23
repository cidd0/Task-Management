import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard, MdTask, MdDone} from "react-icons/md";

const SideNav = () => {
  return (
    <div className="w-64 bg-white border-r border-black h-screen">
      <h1 className="text-4xl font-bold text-center p-5.5">TaskFlow</h1>
      <nav>
        <ul>
          <li>
            <Link to="/" className="flex items-center space-x-3 py-5 font-medium hover:bg-gray-400 transition-color duration-200">
            <MdDashboard className="text-xl text-black ml-3" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/tasks" className="flex items-center space-x-3 py-5 font-medium hover:bg-gray-400 transition-color duration-200">
              <MdTask className="text-xl text-black ml-3" />
              <span>Tasks</span>
            </Link>
          </li>
          <li>
            <Link to="/trash" className="flex items-center space-x-3 py-5 font-medium hover:bg-gray-400 transition-color duration-200">
              <MdDone className="text-xl text-black ml-3" />
              <span>Completed</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
