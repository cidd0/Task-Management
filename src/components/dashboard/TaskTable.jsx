import React, { useState, useEffect } from "react";
import { MdVisibility, MdDelete, MdDone } from "react-icons/md";

const TaskTable = ({ showActions = false, showHeader = true, tasks = [], onView}) => {

    const getPriorityColor = (priority) => {
        if(priority === 'High Priority') {
            return 'bg-red-500';
        } else if (priority === 'Medium Priority') {
            return 'bg-yellow-500';
        } else if (priority === 'Low Priority') {
            return 'bg-green-500';
        } else {
            return 'bg-gray-500';
        }
    }

    return(
        <div>
            {showHeader && (
                <h3 className="text-xl font-bold mb-4 mt-8">Tasks</h3>
            )}

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow">
            {tasks.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-gray-500">
                    Loading tasks...
                </div>
            ) : (
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-2 px-4">Task</th>
                            <th className="text-left py-2 px-4">Priority</th>
                            <th className="text-left py-2 px-4">Deadline</th>
                            {showActions && <th className="text-left py-2 px-4">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task.id} className="border-b">
                                <td className="py-2 px-4">{task.title}</td>
                                <td className="py-2 px-4 flex items-center">
                                    <div className={`w-4 h-4 rounded-full mr-2 ${getPriorityColor(task.priority)}`}></div>
                                    {task.priority}
                                </td>
                                <td className="py-2 px-4">{new Date(task.deadline).toLocaleDateString()}</td>
                                {showActions && (
                                    <td className="py-2 px-4 ml-2">
                                        <button className="text-black hover:underline hover:text-gray-300 transition-color duration-200 cursor-pointer" onClick={() => onView(task)}>
                                            <MdVisibility />
                                        </button>
                                        <button className="text-black hover:underline ml-4 hover:text-gray-300 transition-color duration-200 cursor-pointer">
                                            <MdDelete />
                                        </button>
                                        <button className="text-black hover:underline ml-4 hover:text-gray-300 transition-color duration-200 cursor-pointer">
                                            <MdDone />
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>              
            )}
        </div>
        
    </div>
    );
}

export default TaskTable;