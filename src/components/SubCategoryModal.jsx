/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";

const SubCategoryModal = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const categories = [
    "Electronics",
    "Books",
    "Clothing",
    "Home Decor",
    "Sports",
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      console.log(data);
      reset();
      document.getElementById("my_modal_6").close();
      setErrorMessage("");
    } catch (error) {
      console.log(error);
      setErrorMessage(error?.response?.data?.message);
    }
  };
  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action mt-0 flex flex-col justify-center">
          <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="font-bold text-lg">Please Login</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
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
              <label className="label">
                <span className="label-text">Enter Sub Category</span>
              </label>
              <input
                type="text"
                placeholder="Enter Sub Category"
                className="input input-bordered"
                {...register("subcategory")}
              />
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Add Sub Category"
                className="btn bg-yellow text-white"
              />
            </div>
            <button
              type="button"
              htmlFor="my_modal_5"
              onClick={() => {
                document.getElementById("my_modal_5").close();
                reset();
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default SubCategoryModal;
