/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
const AddProduct = () => {
  // Dummy data for categories and subcategories
  const categories = ["Electronics", "Books", "Clothing"];
  const subcategories = ["Mobiles", "Novels", "T-Shirts"];
  const variants = ["4GB", "6GB", "8GB", "16GB"];
  const IMGBB_APKEY = import.meta.env.VITE_IMGBB_APIKEY;
  const IMGBB_URL = `https://api.imgbb.com/1/upload?key=${IMGBB_APKEY}`;
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const imageData = new FormData();
      imageData.append("image", data.image[0]);

      const result = await axios.post(IMGBB_URL, imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (result.data.success) {
        const product = {
          name: data.name,
          recipe: data.recipe,
          image: result.data?.data?.display_url,
          category: data.category,
          price: parseFloat(data.price),
        };

        const addMenu = await axios.post("/add-product", product);

        if (addMenu.status === 200) {
          console.log("jiiii");
        }
      }
    } catch (error) {
      console.error(error);
      console.log("hii");
      setLoading(false);
      reset();
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <dialog id="my_modal_4" className="modal">
      <div className="modal-box  w-11/12 max-w-5xl custom-scrollbar">
        <div className="modal-action mt-0 flex flex-col justify-center ">
          <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="font-bold text-lg">Add Product</h3>
            <div className="form-control my-2">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <select
                className="input input-bordered"
                {...register("category")}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <div className="flex space-x-2 gap-8">
                <select
                  className="input input-bordered"
                  {...register("variant")}
                >
                  {variants.map((variant, index) => (
                    <option key={index} value={variant}>
                      {variant}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Price"
                  className="input input-bordered"
                  {...register("price")}
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  className="input input-bordered"
                  {...register("quantity")}
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text"> Category</span>
              </label>
              <select
                className="input input-bordered"
                {...register("subcategory")}
              >
                {subcategories.map((subcategory, index) => (
                  <option key={index} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Sub Category</span>
              </label>
              <select
                className="input input-bordered"
                {...register("subcategory")}
              >
                {subcategories.map((subcategory, index) => (
                  <option key={index} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                placeholder="Enter Description"
                className="textarea textarea-bordered"
                {...register("description")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Upload Image</span>
              </label>
              <input
                type="file"
                className="input input-bordered"
                {...register("image")}
              />
            </div>
            {loading ? (
              <div className="loader">
                <span className="loading loading-spinner loading-sm"></span>
              </div>
            ) : (
              <div className="flex items-center justify-end  gap-4">
                <button className="btn bg-yellow text-white px-3 py-1 rounded-xl">
                  Add Item
                </button>
                <button
                  type="button"
                  htmlFor="my_modal_5"
                  onClick={() => {
                    document.getElementById("my_modal_4").close();
                    reset();
                  }}
                  className="btn bg-gray-500 text-white px-3 py-1 rounded-xl"
                >
                  Discard
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AddProduct;
