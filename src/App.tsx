import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./components/Auth/RequireAuth";
import Layout from "./pages/Layouts/Layout";
import GoogleCallback from "./pages/ValidatePage";

function Home() {
  return (
    <div>Home</div>
  )
}

function Level() {
  return (
    <div>Level</div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/success" element={<GoogleCallback />} />
        <Route path="*" element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/level" element={<Level />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
