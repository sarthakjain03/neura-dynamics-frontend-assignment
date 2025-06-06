import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import ProductListingsPage from "./pages/ProductListingsPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import FavouriteProductsPage from "./pages/FavouriteProductsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "./store/productSlice.js";

const App = () => {
  const dispatch = useDispatch();
  dispatch(fetchAllProducts());

  return (
    <div className="bg-[#f5f9ff] min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/products"} />} exact />
          <Route path="/products" element={<ProductListingsPage />} />
          <Route path="/favourites" element={<FavouriteProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
