import React from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Download } from "./pages/Download";
import { Merch } from "./pages/Merch";
import { Footer } from "./components/Footer";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/User/Dashboard";
import { PrivateRoute } from "./components/Routes/Private";
import { AdminRoute } from "./components/Routes/AdminRoute";
import { AdminDashboard } from "./pages/Admin/AdminDashboard";
import { CreateCategory } from "./pages/Admin/CreateCategory";
import { CreateProduct } from "./pages/Admin/CreateProduct";
import { Users } from "./pages/Admin/Users";
import { SingleProduct } from "./pages/Admin/SingleProduct";
import { SingleCategory } from "./pages/Admin/SingleCategory";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/download" element={<Download />} />
        <Route path="/merch" element={<Merch />} />
        <Route path="/merch/product/:slug" element={<SingleProduct />} />
        <Route path="/merch/category/:slug" element={<SingleCategory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
