import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./components/Screens/HomePage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ShopPage from "./components/Screens/ShopPage";
import ProductPage from "./components/Screens/ProductPage";
import CartPage from "./components/Screens/CartPage";
import SignInPage from "./components/Screens/SignInPage";
import SignUpPage from "./components/Screens/SignUpPage";

const AppContent = () => {
  const location = useLocation();
  const shouldShowNavBar = location.pathname !== "/signin" && location.pathname !== "/signup";

  return (
    <>
      {shouldShowNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      <Footer />
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


// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import HomePage from "./components/Screens/HomePage";
// import NavBar from "./components/NavBar";
// import Footer from "./components/Footer";
// import ShopPage from "./components/Screens/ShopPage";
// import ProductPage from "./components/Screens/ProductPage";
// import CartPage from "./components/Screens/CartPage";
// import SignInPage from "./components/Screens/SignInPage";
// import SignUpPage from "./components/Screens/SignUpPage";

// function App() {
//   return (
//     <Router>
//       <NavBar />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/shop" element={<ShopPage />} />
//         <Route path="/product" element={<ProductPage />} />
//         <Route path="/cart" element={<CartPage />} />
//         <Route path="/signin" element={<SignInPage />} />
//         <Route path="/signup" element={<SignUpPage />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }

// export default App;
