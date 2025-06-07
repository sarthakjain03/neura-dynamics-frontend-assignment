import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavourite, removeFavourite } from "../slices/productsSlice";

const useProductActions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToFavouritesClick = (id) => {
    dispatch(addFavourite(id));
  };

  const handleRemoveFavouriteClick = (id) => {
    dispatch(removeFavourite(id));
  };

  const filterProducts = ({ allProducts, searchTerm, category, sortOrder }) => {
    let filteredProducts = [...allProducts];
    if (searchTerm) {
      filteredProducts = filteredProducts?.filter((product) =>
        product.title?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
    }
    if (category && category !== "All") {
      filteredProducts = filteredProducts?.filter((product) => product.category === category);
    }
    if (sortOrder) {
      if (sortOrder === "asc") {
        filteredProducts = filteredProducts?.sort((a, b) => a.price - b.price);
      } else {
        filteredProducts = filteredProducts?.sort((a, b) => b.price - a.price);
      }
    }
    return filteredProducts;
  };

  return {
    handleAddToFavouritesClick,
    handleRemoveFavouriteClick,
    handleCardClick,
    filterProducts,
  };
};

export default useProductActions;
