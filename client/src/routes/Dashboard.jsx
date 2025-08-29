import React, { useState, useEffect } from "react";
import StatCard from "../components/dashboard/StatCard";
import PriorityChart from "../components/dashboard/PriorityChart";
import TaskTable from "../components/dashboard/TaskTable";
import { MdCheckCircle, MdAssignment } from "react-icons/md";

const Dashboard = () => {

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
        const response = await fetch('https://task-management-zbht.onrender.com/api/tasks');
        const data = await response.json();
        setTasks(data);
        console.log('Tasks loaded:', data);
    } catch (error) {
        console.error('Error fetching tasks:', error);
      }
  }
  
  useEffect(() => {
  fetchTasks();
}, []);

  const completed = tasks.filter(task => task.status === 'completed').length;
  const todos = tasks.filter(task => task.status === 'todo').length;
  const todoTasks = tasks.filter(task => task.status === 'todo')
  
  return (
  <div>
      <h1 className="text-3xl font-bold pb-6.5">Dashboard</h1>  
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <StatCard title="COMPLETED TASKS" value={completed} icon={MdCheckCircle}/>
      <StatCard title="TODOS" value={todos} icon={MdAssignment}/>
    </div>
    
      <PriorityChart tasks={todoTasks}/>
      <TaskTable tasks={todoTasks}/>

  </div>
  );
};

export default Dashboard;
