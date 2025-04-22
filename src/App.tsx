import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { TodoList } from "./pages/Todo/Todo";
import LoginPage from "./pages/Auth/LoginPage";
import RequireAuth from "./pages/Auth/RequireAuth";
import Layout from "./pages/Layouts/Layout";
import GoogleCallback from "./pages/Auth/ValidatePage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Project from "./pages/Projects/Project";
import RoadmapPage from "./pages/Projects/components/Roadmap";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/success" element={<GoogleCallback />} />
        <Route path="*" element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route path="/todo" element={<TodoList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/project" element={<Project />}>
              <Route path=":projectId" element={<RoadmapPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;