import Header from "../layout/Header";
import { Skeleton, Rating } from "@mui/material";
import { useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { useEffect } from "react";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { currentProduct, handleRemoveFavouriteClick, handleAddToFavouritesClick, getProductFromId } = useProducts();

  useEffect(() => {
    getProductFromId(id);
  }, [id])

  return (
    <main className="flex flex-col w-full gap-14 pb-14">
      <Header />
      {currentProduct ? (
        <div className="flex justify-center gap-16 font-poppins">
          <img
            src={currentProduct.image}
            alt={currentProduct.title}
            className="size-88"
          />
          <div className="flex flex-col gap-5 max-w-1/2">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-semibold">{currentProduct.title}</h1>
              <div className="px-3 py-1 font-medium bg-gray-300 rounded-2xl w-fit text-xs">
                {currentProduct.category}
              </div>
            </div>
            <p className="text-sm text-gray-500">
              {currentProduct.description}
            </p>
            <div className="flex items-center gap-2">
                <Rating value={currentProduct.rating?.rate} precision={0.1} readOnly />
                <p className="text-gray-500 m-0">
                  ({currentProduct.rating?.count})
                </p>
            </div>
            <p className="font-semibold text-4xl m-0">&#8377; {currentProduct.price}</p>
            {currentProduct?.isFavourite ? (
              <button
                className="border border-blue-600 rounded-md text-blue-600 py-2 px-4 shadow hover:border-blue-700 hover:text-blue-700 text-sm cursor-pointer"
                onClick={handleRemoveFavouriteClick}
              >
                Remove Favourite
              </button>
            ) : (
            <button
              className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-md text-white py-2 px-4 shadow hover:from-blue-700 hover:to-teal-700 text-sm cursor-pointer"
              onClick={handleAddToFavouritesClick}
            >
              Add to Favourites
            </button>
          )}
          </div>
        </div>
      ) : (
        <div className="flex">
            <Skeleton variant="rectangular" height={400} />
            <Skeleton variant="rectangular" height={400} />
        </div>
      )}
    </main>
  );
};

export default ProductDetailsPage;
