import React from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Download } from "./pages/Download";
import { Merch } from "./pages/Merch";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/download" element={<Download />} />
        <Route path="/merch" element={<Merch />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
