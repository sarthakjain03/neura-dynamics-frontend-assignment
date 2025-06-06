import { useSelector } from "react-redux";
import Header from "../layout/Header";
import ProductCard from "../components/ProductCard";
import { Skeleton } from "@mui/material";

const ProductListingsPage = () => {
  const products = useSelector(state => state.products);
  const loading = useSelector(state => state.initialLoading);

  return (
    <main className="flex flex-col w-full gap-14 pb-14">
      <Header />
      <div className="grid grid-cols-3 gap-8 px-14 font-poppins">
        {loading && (
          <>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Skeleton key={item} variant="rectangular" height={400} />
            ))}
          </>
        )}
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            category={product.category}
            image={product.image}
            isFavourite={product.isFavourite}
            rating={product.rating}
          />
        ))}
      </div>
    </main>
  );
};

export default ProductListingsPage;
