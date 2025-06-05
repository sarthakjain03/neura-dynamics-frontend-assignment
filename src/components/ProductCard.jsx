import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, title, description, price, category, image }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      className="flex flex-col items-center justify-between gap-6 rounded-lg shadow-md hover:shadow-lg hover:scale-103 transition-all duration-300 bg-white px-6 pb-5 pt-8 cursor-pointer"
      onClick={handleCardClick}
    >
      <img src={image} alt={title} className="size-48" />
      <div className="w-full flex flex-col gap-3">
        <div className="px-3 py-1 font-medium bg-gray-300 rounded-2xl w-fit text-xs">
          {category}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-medium m-0">{title}</p>
          <p className="text-sm text-gray-500 truncate m-0">{description}</p>
        </div>
        <div className="flex justify-between gap-3 items-center">
          <p className="font-semibold text-xl m-0">&#8377; {price}</p>
          <button
            className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-md text-white py-2 px-4 shadow hover:from-blue-700 hover:to-teal-700 text-sm cursor-pointer"
            onClick={() => {}}
          >
            Add to Favourites
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
