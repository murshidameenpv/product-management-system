/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const variants = ["4GB", "6GB", "8GB", "16GB", "32GB", "64GB"];


const AddProduct = ({ categories }) =>
{
  const [selectedCategory, setSelectedCategory] = useState(null);
  const IMGBB_APKEY = import.meta.env.VITE_IMGBB_APIKEY;
  const IMGBB_URL = `https://api.imgbb.com/1/upload?key=${IMGBB_APKEY}`;
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([null, null, null]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();
  const axiosPublic = useAxiosPublic();
 



  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleImageUpload = async (imageFile, index) => {
    try {
      const imageData = new FormData();
      imageData.append("image", imageFile);

      const result = await axiosPublic.post(IMGBB_URL, imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (result.data.success) {
        setImageUrls((prevUrls) => {
          const newUrls = [...prevUrls];
          newUrls[index] = result?.data?.data?.url;
          console.log(newUrls);
          return newUrls;
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const { mutate: addProduct } = useMutation({
    mutationFn: async (productData) => {
      try {
        const response = await axiosPublic.post(
          "/product/addProduct",
          productData
        );
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      document.getElementById("my_modal_4").close();
      setErrorMessage("");
      reset();
      selectedCategory(null);
      setImageUrls([null, null, null]);
    },
    onError: (error) => {
      setErrorMessage(error.message);
       setImageUrls([null, null, null]);
    },
  });

  const onSubmit = (data) => {
    // Check if all images have been uploaded
    if (imageUrls.every((url) => url !== null)) {
      const productData = {
        productName: data.productName,
        category: data.category,
        subCategory: data.subcategory,
        price: data.price,
        quantity: data.quantity,
        description: data.description,
        images: imageUrls,
        variant: data.variant,
      };

      addProduct(productData);
    } else {
      setErrorMessage("Please upload all images before submitting the form.");
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Enter Product Name </span>
              </label>
              <input
                type="text"
                placeholder="Enter Product Name"
                className="input input-bordered"
                {...register("productName")}
              />
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
                {...register("category")}
                onChange={(e) => {
                  const selectedCat = categories.find(
                    (cat) => cat._id === e.target.value
                  );
                  setSelectedCategory(selectedCat);
                }}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.categoryName}
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
                {selectedCategory?.subCategories.map((subcategory, index) => (
                  <option key={index} value={subcategory._id}>
                    {subcategory.subCategoryName}
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
                <span className="label-text">Upload Images</span>
              </label>
              <div className="flex space-x-4">
                {[1, 2, 3].map((i) => (
                  <label key={i} className="image-upload-box relative">
                    <input
                      type="file"
                      className="absolute opacity-0 w-full h-full"
                      onChange={(e) =>
                        handleImageUpload(e.target.files[0], i - 1)
                      }
                    />
                    {imageUrls[i - 1] ? (
                      <img
                        src={imageUrls[i - 1]}
                        alt="Uploaded"
                        className="w-24 h-24"
                      />
                    ) : (
                      <span className=" w-24 h-24 border border-gray-300 rounded-md flex items-center justify-center text-gray-300 text-2xl">
                        +
                      </span>
                    )}
                  </label>
                ))}
              </div>
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
                     setImageUrls([null, null, null]);
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
