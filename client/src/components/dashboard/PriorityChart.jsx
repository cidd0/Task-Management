import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PriorityChart = ( { tasks }) => {

    const filteredTasks = tasks.filter(task => task.status !== "completed");

    const priorityData = [
        {name: "High Priority", value: filteredTasks.filter(task => task.priority === 'High Priority').length, fill:'#ef4444'},
        {name: "Medium Priority", value: filteredTasks.filter(task => task.priority === 'Medium Priority').length, fill:'#ecc94b'},
        {name: "Low Priority", value: filteredTasks.filter(task => task.priority === 'Low Priority').length, fill:'#22c55e'},
    ]

    return (
        <div>
            <h3 className="text-xl font-bold mb-4 mt-8">Priority Chart</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow">
                <div className="h-64 flex items-center justify-center text-gray-500">
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={priorityData}>
                            <XAxis dataKey="name" />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
        
    )
}
export default PriorityChart;