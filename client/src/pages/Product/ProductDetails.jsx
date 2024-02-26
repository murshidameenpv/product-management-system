/* eslint-disable react/prop-types */
import { FaChevronRight, FaHeart, FaMinus, FaPlus } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import { MdCheck } from "react-icons/md";
import { useState } from "react";
const ProductDetails = () => {
  const product = useLoaderData();
  console.log(product, "ppppppppppp");
  const [quantity, setQuantity] = useState(1);
  const [selectedRam, setSelectedRam] = useState("8GB");
  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, product.stock));
  };

  return (
    <div className="h-screen grid grid-cols-2">
      <div className="px-4 py-8 overflow-auto custom-scrollbar">
        <div className="mb-4 mx-4 px-4 py-4">
          <p className="flex items-center">
            <Link to="/">Home</Link> <FaChevronRight className="mx-2" />
            Product Details
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <img
            className="w-3/4 h-[50%] object-cover rounded-lg border border-black"
            src={product.images[0]}
            alt={product.name}
          />
          <div className="grid grid-cols-2 gap-4 mt-4 w-3/4">
            <img
              className="w-full h-32 object-cover rounded-lg border border-black"
              src={product.images[1]}
              alt={product.name}
            />
            <img
              className="w-full h-32 object-cover rounded-lg border border-black"
              src={product.images[2]}
              alt={product.name}
            />
          </div>
        </div>
      </div>
      <div className="px-4 py-8 overflow-auto flex flex-col items-start justify-center">
        <h1 className="text-2xl font-bold">{product.productName}</h1>
        <p className="text-xl font-semibold mt-2">{product.price}</p>
        <p className="text-sm italic font-semibold mt-2 flex items-center text-black">
          Availability : <MdCheck className="text-green-700" />{" "}
          <span className="text-green-700">In Stock</span>
        </p>
        <p className="mt-2 text-sm font-medium border-b-2 py-3 w-full border-black">
          Hurry Up only 34 Products left
        </p>
        <div className="mt-4 flex justify-between items-center">
          <p>RAM:</p>
          <div className="flex items-center gap-4">
            <div
              onClick={() => setSelectedRam("8GB")}
              className={`border px-2 py-1  text-sm rounded ${
                selectedRam === "8GB" ? "border-blue-500" : "border-black"
              } bg-[#eeee]`}
            >
              8GB
            </div>
            <div
              onClick={() => setSelectedRam("16GB")}
              className={`border px-2 text-sm py-1 rounded ${
                selectedRam === "16GB" ? "border-blue-500" : "border-black"
              } bg-[#eeee]`}
            >
              16GB
            </div>
            <div
              onClick={() => setSelectedRam("4GB")}
              className={`border px-2 text-sm py-1 rounded ${
                selectedRam === "4GB" ? "border-blue-500" : "border-black"
              } bg-[#eeee]`}
            >
              4GB
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-between ">
          <label htmlFor="quantity">Quantity:</label>
          <div className="flex items-center bg-[#eeeeee]  rounded-sm border-black">
            <button onClick={handleDecrease} className="mx-1 border-black">
              <FaMinus />
            </button>
            <input
              className="outline-none  text-center bg-[#eeeeee]"
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max={product.stock}
              value={quantity}
              readOnly
            />
            <button onClick={handleIncrease} className="mx-1">
              <FaPlus />
            </button>
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <button className="btn bg-yellow text-white rounded-2xl mr-4">
            Edit Product
          </button>
          <button className="btn bg-yellow text-white rounded-2xl">
            Delete Product
          </button>
          <button className="btn bg-[#eeee] rounded-full">
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
