import Header from "../layout/Header";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { Skeleton } from "@mui/material";

const FavouriteProductsPage = () => {
  const { products, loading } = useProducts();

  return (
    <main className="flex flex-col w-full gap-14 pb-14">
      <Header />
      <div className="grid grid-cols-3 gap-8 px-14 font-poppins">
        <h1 className="col-span-3 text-3xl">Favourite Products</h1>
        {loading && (
          <>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Skeleton key={item} variant="rectangular" height={400} />
            ))}
          </>
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
