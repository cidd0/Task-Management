import React, { useState } from "react";

const TaskModal = ({ onClose, onTaskCreated, taskToEdit }) => {

    const [formData, setFormData] = useState({
    title: taskToEdit?.title || '',
    description: taskToEdit?.description || '',
    priority: taskToEdit?.priority || '',
    deadline: taskToEdit?.deadline || ''
  })

    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; 

    setIsSubmitting(true);

    try {
        let response;
        if(taskToEdit) {
            response = await fetch (`https://task-management-ufut.onrender.com/api/tasks/${taskToEdit.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });
        } else {
            response =  await fetch (`https://task-management-ufut.onrender.com/api/tasks`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });
        }

        if (response.ok) {
            setShowSuccess(true);
            if (onTaskCreated) onTaskCreated();
            setTimeout(() => {
                setShowSuccess(false);
                onClose();
            }, 2000); 
        } else {
            console.log('Something went wrong');
        }
    } catch (error) {
        console.log('Error:', error);
    } finally {
        setIsSubmitting(false);
    }
  }

    return(
        <div className="w-full h-full fixed inset-0 flex items-center justify-center" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
            <div className="w-[500px] h-auto bg-white border border-gray-200 rounded-lg p-4 shadow">

                <div className="flex justify-between items-center mb-4">
                    <h3>{taskToEdit ? "Edit Task" : "Add New Task"}</h3>
                    
                    <button className="hover:bg-gray-200 transition-color duration-200 cursor-pointer" onClick={onClose}>X</button>
                </div>
                {showSuccess && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                            ✅ Task created successfully!
                        </div>
                    )}
                <div className="">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Task Title</label>
                            <input type="text" name="title" value={formData.title}
                            onChange={handleChange} placeholder="Task Title" className="w-full border border-gray-300 rounded-md p-2" required/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2"
                            rows="3" placeholder="Task Description..."/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Priority Level</label>
                            <select name="priority" value={formData.priority} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 " required>
                                <option value="" disabled>Select Priority</option>
                                <option value="Low Priority">Low Priority</option>
                                <option value="Medium Priority">Medium Priority</option>
                                <option value="High Priority">High Priority</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-2"> Set Deadline</label>
                            <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" required min={new Date().toISOString().split("T")[0]}/>
                        </div>
                        <div className="flex gap-2 mt-6">
                            <button type="submit" disabled={isSubmitting} className="flex-1 bg-black text-white hover:bg-gray-400 transition-color duration-200 border rounded-md p-2">{isSubmitting ? "Adding..." : taskToEdit ? "Save Task" : "Add Task"}</button>
                            <button type="button" className="flex-1 hover:bg-gray-200 transition-color duration-200 border rounded-md p-2" onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TaskModal;