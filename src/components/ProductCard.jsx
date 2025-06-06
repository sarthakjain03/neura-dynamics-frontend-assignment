import useProducts from "../hooks/useProducts";
import { Rating } from "@mui/material";

const ProductCard = ({
  id,
  title,
  description,
  price,
  category,
  image,
  rating,
  isFavourite = false,
  canRemoveFromFavourites = false,
}) => {
  const {
    handleAddToFavouritesClick,
    handleRemoveFavouriteClick,
    handleCardClick,
  } = useProducts();

  return (
    <div className="flex flex-col items-center justify-between gap-6 rounded-lg shadow-md hover:shadow-lg hover:scale-103 transition-all duration-300 bg-white px-6 pb-5 pt-8">
      <img
        src={image}
        alt={title}
        className="size-48 cursor-pointer"
        onClick={() => handleCardClick(id)}
      />
      <div className="w-full flex flex-col gap-3">
        <div className="px-3 py-1 font-medium bg-gray-300 rounded-2xl w-fit text-xs">
          {category}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-medium m-0">{title}</p>
          <p className="text-sm text-gray-500 truncate m-0">{description}</p>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <Rating value={rating?.rate} precision={0.1} readOnly />
          <p className="text-gray-500 m-0">({rating?.count})</p>
        </div>
        <div className="flex justify-between gap-3 items-center">
          <p className="font-semibold text-2xl m-0">&#8377; {price}</p>
          {isFavourite ? (
            canRemoveFromFavourites ? (
              <button
                className="border border-blue-600 rounded-md text-blue-600 py-2 px-4 shadow hover:border-blue-700 hover:text-blue-700 text-sm cursor-pointer"
                onClick={() => handleRemoveFavouriteClick(id)}
              >
                Remove Favourite
              </button>
            ) : (
              <button
                className="text-gray-400 text-sm py-2 px-4"
                disabled={true}
              >
                Marked as Favourite
              </button>
            )
          ) : (
            <button
              className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-md text-white py-2 px-4 shadow hover:from-blue-700 hover:to-teal-700 text-sm cursor-pointer"
              onClick={() => handleAddToFavouritesClick(id)}
            >
              Add to Favourites
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
