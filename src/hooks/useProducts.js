import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavourite, removeFavourite } from "../store/productSlice";

const useProducts = () => {
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

  return {
    handleAddToFavouritesClick,
    handleRemoveFavouriteClick,
    handleCardClick,
  };
};

export default useProducts;
