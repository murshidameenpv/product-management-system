import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import Cards from "../../components/Cards";
import CategoryModal from "../../components/CategoryModal.jsx";
import SubCategoryModal from "../../components/SubCategoryModal.jsx";
import AddProduct from "../../components/AddProduct.jsx";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic.jsx";


const Home = () => {
  const axiosPublic = useAxiosPublic();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [open, setOpen] = useState(false);
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

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const response = await axiosPublic.get("/product/getProducts");
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

  //for shwoing all products initiallu
  useEffect(() => {
    if (products) setFilteredProducts(products);
  }, [products]);

  const filterItems = (selectedId, event) => {
    if (event.target.type === "checkbox") {
      if (event.target.checked) {
        setSelectedSubCategory(selectedId);
        const newFilteredProducts = products.filter((product) => {
          return (
            product.category === selectedId ||
            product.subCategory === selectedId
          );
        });
        setFilteredProducts(newFilteredProducts);
      } else {
        // Reset selectedSubCategory when a checkbox is unchecked
        setSelectedSubCategory(null);
        const newFilteredProducts = products.filter((product) => {
          return product.category === event.target.name;
        });
        setFilteredProducts(newFilteredProducts);
      }
    }
    setCurrentPage(1);
  };

  //pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              onClick={(event) => {
                handleToggle(category._id);
                filterItems(category._id, event);
              }}
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
                      name={category._id}
                      checked={selectedSubCategory === subCategory._id}
                      onClick={(event) => filterItems(subCategory._id, event)}
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
        <AddProduct categories={categories} />
        <div className="grid grid-cols-3 gap-4 justify-items-center pt-16 mx-3 px-3 py-2 ">
          {currentItem.map((product) => (
            <Cards key={product.id} product={product} />
          ))}
        </div>
        {/* paginaton  */}
        <div className="flex items-center justify-center">
          {Array.from({
            length: Math.ceil(filteredProducts.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 rounded-full ${
                currentPage === index + 1
                  ? "bg-yellow text-white"
                  : "bg-gray-400"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
