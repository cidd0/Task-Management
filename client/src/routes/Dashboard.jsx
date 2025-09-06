import React, { useState, useEffect } from "react";
import StatCard from "../components/dashboard/StatCard";
import PriorityChart from "../components/dashboard/PriorityChart";
import TaskTable from "../components/dashboard/TaskTable";
import { MdCheckCircle, MdAssignment, MdAccessTime } from "react-icons/md";

const Dashboard = () => {

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
        const response = await fetch('https://task-management-ufut.onrender.com/api/tasks');
        const data = await response.json();
        
        // Check if data is an array
        if (Array.isArray(data)) {
            setTasks(data);
            console.log('Tasks loaded:', data);
        } else {
            console.error('Expected array, got:', data);
            setTasks([]); // Empty array prevents filter errors
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
        setTasks([]);
    }
  }
  
  useEffect(() => {
  fetchTasks();
}, []);

  const completed = tasks.filter(task => task.status === 'completed').length;
  const todos = tasks.filter(task => task.status === 'todo').length;
  const todoTasks = tasks.filter(task => task.status === 'todo');

  const dueSoon = tasks.filter(task => {
    if(task.status !== "completed" && task.deadline){
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const deadline = new Date(task.deadline);
      const diffTime = deadline - today;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays > 0 && diffDays <= 2;
    }
    return false;
  }).length;
  
  return (
  <div>
      <h1 className="text-3xl font-bold pb-6.5">Dashboard</h1>  
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard title="COMPLETED TASKS" value={completed} icon={MdCheckCircle}/>
      <StatCard title="TODOS" value={todos} icon={MdAssignment}/>
      <StatCard title="DUE SOON" value={dueSoon} icon={MdAccessTime}/>
    </div>
    
      <PriorityChart tasks={todoTasks}/>
      <TaskTable tasks={todoTasks}/>

  </div>
  );
};

export default Dashboard;
