import React from "react";
import { BrowserRouter as Router, useLocation, Routes, Route } from "react-router-dom";
import HomePage from "./components/Screens/HomePage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ShopPage from "./components/Screens/ShopPage";
import ProductPage from "./components/Screens/ProductPage";
import CartPage from "./components/Screens/CartPage";
import SignInPage from "./components/Screens/SignInPage";
import SignUpPage from "./components/Screens/SignUpPage";
import DashboardPage from "./components/Admin/DashboardPage";
import UsersPage from "./components/Admin/UsersPage";
import AdminProductsPage from "./components/Admin/AdminProductsPage";
import EditProductPage from "./components/Admin/EditProductPage";

const AppContent = () => {
  const location = useLocation();
  const isAdminSection = location.pathname.startsWith("/admin");
  const shouldShowNavBar = location.pathname !== "/signin" && location.pathname !== "/signup";
  const shouldShowFooter = !isAdminSection;

  return (
    <>
      {shouldShowNavBar && <NavBar />}
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/admin/edit-product/:id" element={<EditProductPage />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
