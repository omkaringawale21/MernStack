import React from "react";
import AddUser from "./Components/AddUser";
import NavBar from "./Components/NavBar";
import CodeForUses from "./Components/CodeForUses";
import AllUsers from "./Components/AllUsers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditUser from "./Components/EditUser";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<CodeForUses />} />
        <Route path="/all" element={<AllUsers />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
