import React, { useState, useEffect } from "react";
import TaskTable from "../components/dashboard/TaskTable";
import TaskModal from "../components/dashboard/TaskModal";
import ConfirmationModal from "../components/tasks/ConfirmationModal";

const Tasks = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [sortByPriority, setSortByPriority] = useState(false);

  const handleView =(task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  }

  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setConfirmAction("delete");
    setIsConfirmOpen(true);
  }

  const handleDoneClick = (task) => {
    setSelectedTask(task);
    setConfirmAction("done");
    setIsConfirmOpen(true);
  }

  const handleDone =  async (taskId) => {

    try {
      const response = await fetch(`https://task-management-ufut.onrender.com/api/tasks/${taskId}`, {
        method: 'PUT',
        headers:  { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: 'completed' }),
      })
      if (response.ok) {
        fetchTasks();
      } else {
        console.error('Failed to mark task as completed');
      }
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  }

  const handleConfirm = async () => {
    if (confirmAction === "delete" && selectedTask) {
      await handleDelete(selectedTask.id);
    }
    if (confirmAction === "done" && selectedTask) {
      await handleDone(selectedTask.id);
    } 
    setIsConfirmOpen(false);
    setSelectedTask(null);
    setConfirmAction(null);
  }

  const fetchTasks = async () => {
          try {
              const response = await fetch('https://task-management-ufut.onrender.com/api/tasks');
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

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`https://task-management-ufut.onrender.com/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTasks();
      } else {
        console.error('Failed to delete task');
      }   
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  let activeTasks = tasks.filter(task => task.status !== "completed")

  const priorityOrder = {
    "High Priority": 1,
    "Medium Priority": 2,
    "Low Priority": 3,
  };

  if (sortByPriority) {
    activeTasks = [...activeTasks].sort(
      (a, b) => (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4)
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold ">Tasks</h1>  
        <div className="flex gap-2">
          <button className="bg-white p-3  border hover:bg-black hover:text-amber-50 transition-color duration-200 border-black rounded-lg cursor-pointer" onClick={() => setSortByPriority((prev) => !prev)}>
            {sortByPriority ? "Unsort" : "Sort by Priority"}
          </button>
          <button className="bg-white p-3  border hover:bg-black hover:text-amber-50 transition-color duration-200 border-black rounded-lg cursor-pointer" 
          onClick={() => setIsModalOpen(true)}>
            + Add Task
          </button>
        </div>
            
    </div>

      <TaskTable 
      showActions={true} 
      showHeader={false} 
      tasks={activeTasks} 
      onView={handleView}
      onDelete={handleDeleteClick}
      onDone={handleDoneClick}
      />

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

      <ConfirmationModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
        message={
          confirmAction === "delete"
          ? "Are you sure you want to delete this task?"
          : "Are you sure you are done with this task?"
        }
      />
    </div>
  );
};

export default Tasks;
