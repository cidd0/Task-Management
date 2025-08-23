import React, { useState, useEffect } from "react";
import StatCard from "../components/dashboard/StatCard";
import PriorityChart from "../components/dashboard/PriorityChart";
import TaskTable from "../components/dashboard/TaskTable";
import TaskModal from "../components/dashboard/TaskModal";

const Dashboard = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/tasks');
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

  
  return (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold ">Dashboard</h1>  
      <button className="bg-white p-3  border hover:bg-black hover:text-amber-50 transition-color duration-200 border-black rounded-lg cursor-pointer" 
      onClick={() => setIsModalOpen(true)}>
        + Add Task
      </button>  
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="TOTAL TASKS" value="14" />
      <StatCard title="COMPLETED TASKS" value="7" />
      <StatCard title="TASKS IN PROGRESS" value="2" />
      <StatCard title="TODOS" value="5" />
    </div>
    
      <PriorityChart />
      <TaskTable tasks={tasks}/>

      {isModalOpen && <TaskModal onClose={() => setIsModalOpen(false)} onTaskCreated={() => window.location.reload()} />}
  </div>
  );
};

export default Dashboard;
