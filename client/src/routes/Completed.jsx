import React, { useState, useEffect }from "react";
import TaskTable from "../components/dashboard/TaskTable";

const Completed = () => {

  const [tasks, setTasks] = useState([]);

  const fetchCompletedTasks = async () => {
      try {
        const response = await fetch('https://task-management-zbht.onrender.com/api/tasks');
        const data = await response.json();
        setTasks(data.filter(task => task.status === "completed"));
        console.log('Completed tasks loaded:', data);
      } catch (error) {
        console.error('Error fetching completed tasks:', error);
      }
    }

    useEffect(() => {
      fetchCompletedTasks();
    }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold pb-6.5">Completed Tasks</h1>
      </div>
      <TaskTable 
      tasks={tasks}
      showHeader={false}
      />
    </div>
  )
};

export default Completed;
