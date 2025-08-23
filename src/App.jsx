import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";

import Dashboard from "./routes/Dashboard";
import Tasks from "./routes/Tasks";
import Completed from "./routes/Completed";

function App() {
  
  return (
        <Router>
          <DashboardLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/completed" element={<Completed />} />
            </Routes>
          </DashboardLayout>
        </Router>
  )
}

export default App;
