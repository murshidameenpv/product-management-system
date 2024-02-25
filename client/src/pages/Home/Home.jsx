import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import Cards from "../../components/Cards";
import CategoryModal from "../../components/CategoryModal.jsx";
import SubCategoryModal from "../../components/SubCategoryModal.jsx";
import AddProduct from "../../components/AddProduct.jsx";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic.jsx";
const products = [
  {
    id: 1,
    name: "Product 1",
    image:
      "https://cdn.pixabay.com/photo/2023/03/27/16/24/sports-car-7881150_1280.jpg",
    price: "455",
  },
  {
    id: 2,
    name: "Product 2",
    image: "https://via.placeholder.com/150",
    price: "455",
  },
  {
    id: 3,
    name: "Product 3",
    image: "https://via.placeholder.com/150",
    price: "455",
  },
  {
    id: 4,
    name: "Product 2",
    image: "https://via.placeholder.com/150",
    price: "455",
  },
  {
    id: 5,
    name: "Product 22",
    image: "https://via.placeholder.com/150",
    price: "455",
  },
  {
    id: 6,
    name: "Product 2",
    image: "https://via.placeholder.com/150",
    price: "455",
  },
  {
    id: 7,
    name: "Product 3",
    image: "https://via.placeholder.com/150",
    price: "455",
  },
];
const Home = () => {
  const axiosPublic = useAxiosPublic();

  const [open, setOpen] = useState({
    all: false,
    laptop: false,
    tablet: false,
    smartphone: false,
  });
  const { data: categories = [] } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      try {
        const response = await axiosPublic.get("/product/categories");
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error("Network response was not ok");
      }
    },
  });
  const handleToggle = (categoryId) => {
    setOpen((prev) => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  return (
    <div className="h-screen grid grid-cols-12">
      <div className="col-span-2 px-4 py-8 overflow-auto">
        <div className="mb-4 mx-4 px-4 py-4">
          <p className="flex items-center">
            Home{" "}
            <span className="px-2">
              <FaChevronRight />
            </span>
          </p>
          <p className="mt-4 px-2 py-3 text-blue-800 font-semibold">
            Categories
          </p>
        </div>
        {categories.map((category) => (
          <div key={category._id} className="my-2 mx-2 px-2 py-3">
            <button
              className="flex justify-between items-center w-full"
              onClick={() => handleToggle(category._id)}
            >
              {category.categoryName}
              <span>
                {open[category._id] ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            </button>
            {open[category._id] && (
              <div className="flex flex-col gap-2 px-2 py-3 mx-2">
                {category.subCategories.map((subCategory) => (
                  <div
                    className="flex items-center gap-3"
                    key={subCategory._id}
                  >
                    <input
                      type="checkbox"
                      id={subCategory._id}
                      name={subCategory._id}
                    />
                    <label htmlFor={subCategory._id}>
                      {subCategory.subCategoryName}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="col-span-10  px-4 py-8 relative mx-2 my-4 overflow-auto custom-scrollbar">
        <div className="absolute top-0 right-0 flex gap-4">
          <button
            className="btn bg-yellow text-white rounded-2xl"
            onClick={() => document.getElementById("my_modal_4").showModal()}
          >
            Add Product
          </button>
          <button
            className="btn bg-yellow text-white rounded-2xl"
            onClick={() => document.getElementById("my_modal_6").showModal()}
          >
            Add Category
          </button>
          <button
            className="btn bg-yellow text-white rounded-2xl"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            Add Subcategory
          </button>
        </div>
        <CategoryModal />
        <SubCategoryModal categories={categories} />
        <AddProduct />
        <div className="grid grid-cols-3 gap-4 justify-items-center pt-16 mx-3 px-3 py-2 ">
          {products.map((product) => (
            <Cards key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
