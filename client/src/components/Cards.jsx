/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
const Cards = ({ product }) => {
  const [isHeartFilled, setHeartFilled] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const handleHeartClicked = () => {
    setHeartFilled(!isHeartFilled);
  };
  return (
    <div className="max-w-xl rounded-lg border border-black p-6 m-4">
      <div className="relative">
        <Link
          to={`/product/${product._id}`}
          className="hover:scale-105 transition-all duration-200"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            className="w-full h-64 object-cover rounded-t-lg"
            src={product.images[0]}
            alt={product.productName}
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl">
              View Product
            </div>
          )}
        </Link>

        <div
          className={`rating gap-1 absolute right-1 top-0 p-4 heartStar bg-green ${
            isHeartFilled ? "text-rose-600" : "text-white"
          }`}
          onClick={handleHeartClicked}
        >
          <FaHeart className="h-5 w-5 cursor-pointer" />
        </div>
      </div>
      <div className="mt-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="card-title">{product.productName}</h2>
        </Link>
        <div>
          <p className="text-lg font-semibold">{product.price}</p>
        </div>
        <div className="flex gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-500" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
