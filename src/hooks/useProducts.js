import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentProduct, setCurrentProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      const allInitialProducts = response?.data?.map((item) => ({
        ...item,
        isFavourite: false,
      }));
      setProducts(allInitialProducts);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToFavouritesClick = () => {};

  const handleRemoveFavouriteClick = () => {};

  const getProductFromId = (id) => {
    const currentProduct = products?.find(
      (product) => product.id === Number(id)
    );
    setCurrentProduct(currentProduct);
  };

  return {
    products,
    loading,
    currentProduct,
    handleAddToFavouritesClick,
    handleRemoveFavouriteClick,
    handleCardClick,
    fetchProducts,
    getProductFromId,
  };
};

export default useProducts;
