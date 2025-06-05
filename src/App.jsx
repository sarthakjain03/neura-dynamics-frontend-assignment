import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import ProductListingsPage from "./pages/ProductListingsPage.jsx";
// import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  return (
    <div className="bg-[#f5f9ff] min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/products"} />} exact />
          <Route path="/products" element={<ProductListingsPage />} />
          {/* <Route path="/product/:id" element={<ProductListingsPage />} /> */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
