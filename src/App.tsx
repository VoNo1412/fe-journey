import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { TodoList } from "./pages/Todo/Todo";
import LoginPage from "./pages/Auth/LoginPage";
import RequireAuth from "./pages/Auth/RequireAuth";
import Layout from "./pages/Layouts/Layout";
import GoogleCallback from "./pages/Auth/ValidatePage";
import Dashboard from "./pages/Dashboard/Dashboard";

// function Home() {
//   return (
//     <div>Home</div>
//   )
// }

// function Dashboard() {
//   return (
//     <div>Dashboard</div>
//   )
// }

// function Level() {
//   return (
//     <div>Level</div>
//   )
// }

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
            {/* <Route path="/list" element={<Home />} />
            <Route path="/calendar" element={<Level />} />
            <Route path="/messages" element={<Level />} /> */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
