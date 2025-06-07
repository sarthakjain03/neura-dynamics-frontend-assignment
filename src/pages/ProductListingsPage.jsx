import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useDebounce from "../hooks/useDebounce";
import useProductActions from "../hooks/useProductActions";
import Header from "../layout/Header";
import ProductCard from "../components/ProductCard";
import {
  Skeleton,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
} from "@mui/material";
import { IoIosSearch } from "react-icons/io";
import {
  FaSort,
  FaSortAmountDownAlt,
  FaSortAmountUp,
  FaFilter,
} from "react-icons/fa";
import { RiResetLeftLine } from "react-icons/ri";

const ProductListingsPage = () => {
  const { products, initialLoading } = useSelector((state) => state);
  const [loading, setLoading] = useState(initialLoading);
  const { filterProducts } = useProductActions();
  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "All",
  });
  const [sortOrder, setSortOrder] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const debouncedSearchValue = useDebounce(filters?.searchTerm);

  const getAllUniqueCategories = () => {
    const unqCategories = [];
    products.forEach((product) => {
      if (!unqCategories.includes(product.category)) {
        unqCategories.push(product.category);
      }
    });
    setCategories(unqCategories);
  };

  const handleSortClick = () => {
    setSortOrder((prev) => {
      if (prev === "asc") {
        return "desc";
      } else if (prev === "desc") {
        return "";
      }
      return "asc";
    });
  };

  const handleResetFilters = () => {
    setFilters({
      searchTerm: "",
      category: "All",
    });
    setSortOrder("");
  };

  useEffect(() => {
    setLoading(initialLoading);
  }, [initialLoading]);

  useEffect(() => {
    if (products?.length > 0) {
      setFilteredProducts(products);
      getAllUniqueCategories();
    }
  }, [products]);

  useEffect(() => {
    setLoading(true);
    setFilteredProducts(
      filterProducts({
        allProducts: products,
        searchTerm: debouncedSearchValue,
        category: filters?.category,
        sortOrder: sortOrder,
      })
    );
    setLoading(false);
  }, [filters, debouncedSearchValue, sortOrder]);

  return (
    <main className="flex flex-col w-full gap-14 pb-14">
      <Header />
      <div className="grid grid-cols-3 gap-8 px-20 font-poppins">
        <div className="col-span-3 bg-white w-full rounded-lg shadow px-5 py-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="flex items-center gap-3 text-xl font-medium">
              <FaFilter size={18} />
              Filters
            </h2>
            <button
              onClick={handleResetFilters}
              className="py-2 flex items-center gap-2 text-sm text-white px-10 rounded-md bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              <RiResetLeftLine size={16} />
              Reset
            </button>
          </div>
          <div className="grid grid-cols-3 items-center gap-8">
            <div className="col-span-1">
              <TextField
                id="search-title"
                variant="outlined"
                placeholder="Search Title..."
                fullWidth
                size="small"
                value={filters?.searchTerm}
                onChange={(e) =>
                  setFilters({ ...filters, searchTerm: e.target.value })
                }
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <IoIosSearch size={20} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>
            <div className="col-span-1">
              <Select
                fullWidth
                size="small"
                value={filters?.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
              >
                <MenuItem value="All">All Categories</MenuItem>
                {categories?.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="col-span-1">
              <button
                className="cursor-pointer flex gap-2 justify-center items-center w-full text-sm border rounded-md py-2"
                onClick={handleSortClick}
              >
                {!sortOrder && <FaSort size={16} />}
                {sortOrder === "asc" && <FaSortAmountDownAlt size={16} />}
                {sortOrder === "desc" && <FaSortAmountUp size={16} />}
                Sort by Price
              </button>
            </div>
          </div>
        </div>
        {loading && (
          <>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Skeleton key={item} variant="rectangular" height={400} />
            ))}
          </>
        )}
        {filteredProducts?.map((product) => (
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
