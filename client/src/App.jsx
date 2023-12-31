import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/User/Home";
import { Download } from "./pages/User/Download";
import { Merch } from "./pages/User/Merch";
import { Login } from "./pages/User/Login";
import { Register } from "./pages/User/Register";
import { Dashboard } from "./pages/User/Dashboard";
import { PrivateRoute } from "./components/Routes/Private";
import { AdminRoute } from "./components/Routes/AdminRoute";
import { AdminDashboard } from "./pages/Admin/AdminDashboard";
import { CreateCategory } from "./pages/Admin/CreateCategory";
import { CreateProduct } from "./pages/Admin/CreateProduct";
import { SingleProduct } from "./pages/User/SingleProduct";
import { SingleCategory } from "./pages/User/SingleCategory";
import { Search } from "./pages/User/Search";
import { Checkout } from "./pages/User/Checkout";
import { CheckoutSuccess } from "./pages/User/CheckoutSuccess";
import { ManageProduct } from "./pages/Admin/ManageProduct";
import { ManageOrder } from "./pages/Admin/ManageOrder";
import { Sale } from "./pages/User/Sale";
import { NewArrivals } from "./pages/User/NewArrivals";
import { OrderHistory } from "./pages/User/OrderHistory";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin/home" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/manage-product" element={<ManageProduct />} />
          <Route path="admin/manage-order" element={<ManageOrder />} />
        </Route>
        <Route path="/download" element={<Download />} />
        <Route path="/merch" element={<Merch />} />
        <Route path="/merch/sale" element={<Sale />} />
        <Route path="/merch/new-arrivals" element={<NewArrivals />} />
        <Route path="/merch/product/:slug" element={<SingleProduct />} />
        <Route path="/merch/category/:slug" element={<SingleCategory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/merch/search/:keyword" element={<Search />} />
        <Route path="/merch/checkout" element={<Checkout />} />
        <Route path="/merch/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/order-history" element={<OrderHistory />} />
      </Routes>
    </div>
  );
}

export default App;
