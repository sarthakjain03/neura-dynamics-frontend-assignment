import Header from "../layout/Header";
import useProducts from "../hooks/useProducts";

const ProductListingsPage = () => {
  const { products } = useProducts();

  return (
    <main className="flex flex-col w-full gap-14 pb-14">
      <Header />
      <div className="grid grid-cols-3 gap-8 px-14 font-poppins">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center justify-between gap-6 rounded-lg shadow-md hover:shadow-lg hover:scale-103 transition-all duration-300 bg-white p-6 cursor-pointer"
          >
            <img src={product.image} alt={product.title} className="size-48" />
            <div className="w-full flex flex-col gap-3">
              <div className="px-3 py-1 font-medium bg-gray-300 rounded-2xl w-fit text-xs">
                {product.category}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-lg font-medium m-0">{product.title}</p>
                <p className="text-sm text-gray-500 truncate m-0">
                  {product.description}
                </p>
              </div>
              <div className="flex justify-between gap-3 items-center">
              <p className="font-semibold text-xl m-0"> &#8377; {product.price}</p>
                <button className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-md text-white py-2 px-4 shadow hover:from-blue-700 hover:to-teal-700 text-sm cursor-pointer" onClick={() => {}}>
                  Add to Favourites
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProductListingsPage;
