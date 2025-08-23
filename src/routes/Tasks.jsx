import React, { useState, useEffect } from "react";
import TaskTable from "../components/dashboard/TaskTable";
import TaskModal from "../components/dashboard/TaskModal";

const Tasks = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);


  const handleView =(task) =>{
    setEditingTask(task);
    setIsModalOpen(true);
  }

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
      <h1 className="text-3xl font-bold pb-6.5">Tasks</h1>
      <TaskTable showActions={true} showHeader={false} tasks={tasks} onView={handleView}/>

      {isModalOpen && (
        <TaskModal 
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          onTaskCreated={fetchTasks}
          taskToEdit={editingTask}
        />
      )}
    </div>
  );
};

export default Tasks;
