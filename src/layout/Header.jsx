import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const products = useSelector(state => state.products);

  const handleFavouritesClick = () => {
    navigate("/favourites");
  };

  const handleTitleClick = () => {
    navigate("/products");
  };

  return (
    <header className="w-full px-20 flex justify-between items-center py-6 font-poppins bg-white shadow-md">
      <h3 className="text-3xl font-semibold cursor-pointer" onClick={handleTitleClick}>Products</h3>
      <button
        className="cursor-pointer bg-gradient-to-r from-blue-600 to-teal-600 rounded-md text-white py-2 px-4 shadow hover:from-blue-700 hover:to-teal-700"
        onClick={handleFavouritesClick}
      >
        Favourites ({products?.filter((item) => item.isFavourite)?.length})
      </button>
    </header>
  );
};

export default Header;
