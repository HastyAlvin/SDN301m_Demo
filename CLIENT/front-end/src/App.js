import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"; // Thay đổi import
import "./App.css";
import ProductList from "./Component/ProductList";
import CategoryList from "./Component/CategoryList";

function App() {
  return (
    <Router>
      <div className="nav-bar">
        <nav>
          <div className="List">
            <Link to="/products">Product List</Link>
          </div>
          <div className="List">
            <Link to="/categories">Category List</Link>
          </div>
          <div className="List">
            <Link to="/product/:id">ProductDetail</Link>
          </div>
        </nav>

        <Routes>
          {" "}
          {/* Thay đổi từ Switch thành Routes */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/categories" element={<CategoryList />} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
