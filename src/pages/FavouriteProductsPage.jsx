import { useSelector } from "react-redux";
import Header from "../layout/Header";
import ProductCard from "../components/ProductCard";

const FavouriteProductsPage = () => {
  const products = useSelector(state => state.products);

  return (
    <main className="flex flex-col w-full gap-14 pb-14">
      <Header />
      <div className="grid grid-cols-3 gap-8 px-20 font-poppins">
        <h1 className="col-span-3 text-3xl">Favourite Products</h1>
        {products?.filter((item) => item.isFavourite)?.length === 0 && (
          <div className="flex justify-center col-span-3 mt-8">
            <p className="text-center text-gray-500 text-2xl">
              No products marked as favourite
            </p>
          </div>
        )}
        {products?.filter((item) => item.isFavourite)?.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            category={product.category}
            image={product.image}
            isFavourite={product.isFavourite}
            canRemoveFromFavourites={true}
            rating={product.rating}
          />
        ))}
      </div>
    </main>
  );
};

export default FavouriteProductsPage;
