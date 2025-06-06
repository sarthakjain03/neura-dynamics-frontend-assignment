import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../layout/Header";
import { Skeleton, Rating } from "@mui/material";
import useProducts from "../hooks/useProducts";

const ProductDetailsPage = () => {
  const products = useSelector(state => state.products);
  const { id } = useParams();
  const { handleRemoveFavouriteClick, handleAddToFavouritesClick } = useProducts();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const product = products?.find((item) => item.id === Number(id));
    setProduct(product);
  }, [id, products])

  return (
    <main className="flex flex-col w-full gap-14 pb-14">
      <Header />
      {product ? (
        <div className="flex justify-center gap-16 font-poppins">
          <img
            src={product.image}
            alt={product.title}
            className="size-88"
          />
          <div className="flex flex-col gap-5 max-w-1/2">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-semibold">{product.title}</h1>
              <div className="px-3 py-1 font-medium bg-gray-300 rounded-2xl w-fit text-xs">
                {product.category}
              </div>
            </div>
            <p className="text-sm text-gray-500">
              {product.description}
            </p>
            <div className="flex items-center gap-1">
                <Rating value={product.rating?.rate} precision={0.1} readOnly />
                <p className="text-gray-500 m-0">
                  ({product.rating?.count})
                </p>
            </div>
            <p className="font-semibold text-4xl m-0">&#8377; {product.price}</p>
            {product?.isFavourite ? (
              <button
                className="border border-blue-600 rounded-md text-blue-600 py-2 px-4 shadow hover:border-blue-700 hover:text-blue-700 text-sm cursor-pointer"
                onClick={() => handleRemoveFavouriteClick(product.id)}
              >
                Remove Favourite
              </button>
            ) : (
            <button
              className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-md text-white py-2 px-4 shadow hover:from-blue-700 hover:to-teal-700 text-sm cursor-pointer"
              onClick={() => handleAddToFavouritesClick(product.id)}
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
