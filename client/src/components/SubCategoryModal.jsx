/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosPrivate";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const SubCategoryModal = ({ categories }) => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await axiosPublic.post(
          "/product/addSubCategory",
          data
        );
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]);
      document.getElementById("my_modal_5").close();
      setErrorMessage("");
      reset();
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const onSubmit = (data) => {
    mutate({
      categoryId: data.category,
      subCategoryName: data.subcategory,
    });
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
                  <option key={index} value={category._id}>
                    {category.categoryName}
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
            {errorMessage && (
              <div className="text-center italic text-sm">
                <span className="text-red-900">{errorMessage}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default SubCategoryModal;
