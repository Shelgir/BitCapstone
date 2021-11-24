import "./App.css";
import "tailwindcss/tailwind.css";
import { Routes, Route } from "react-router-dom";
import TheNavbar from "./components/TheNavbar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CategoryPage from "./pages/CategoryPage";
import TypeCat from "./pages/TypeCat";
import CartPage from "./pages/CartPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProductsDetails from "./pages/ProductsDetails";
import CategoryByName from "./components/CategoryByNameComp";
import Footer from "./components/Footer";
import CheckToken from "./components/CheckToken";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-between font-abel">
      <TheNavbar />
      <CheckToken />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductsDetails />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/categories/:name" element={<CategoryByName />} />
        <Route path="/type" element={<TypeCat />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/*" element={<main>Nothing Here 404</main>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
