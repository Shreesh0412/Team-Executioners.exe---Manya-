import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Organizer from "./pages/Organizer";
import Viewer from "./pages/Viewer";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/organizer" element={<Organizer />} />

      <Route path="/viewer/:id" element={<Viewer />} />

    </Routes>
  );
}

export default App;