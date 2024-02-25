/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CategoryModal = () => {
  const axiosPublic = useAxiosPublic();
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await axiosPublic.post("/product/addCategory", data);
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]);
      document.getElementById("my_modal_6").close();
      setErrorMessage("");
      reset();
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const onSubmit = (data) => {
    mutate({ categoryName: data.categoryName });
  };

  return (
    <dialog id="my_modal_6" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action mt-0 flex flex-col justify-center">
          <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="font-bold text-lg">Add Category</h3>
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <input
                type="text"
                placeholder="Enter Category"
                className="input input-bordered"
                {...register("categoryName")}
              />
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Add Category"
                className="btn bg-yellow text-white"
              />
            </div>
            <button
              type="button"
              htmlFor="my_modal_5"
              onClick={() => {
                document.getElementById("my_modal_6").close();
                setErrorMessage("");
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

export default CategoryModal;
