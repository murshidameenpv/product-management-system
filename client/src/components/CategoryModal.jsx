/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";

const CategoryModal = () => {
  const [errorMessage, setErrorMessage] = useState("");
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
      document.getElementById("my_modal_5").close();
      setErrorMessage("");
    } catch (error) {
      console.log(error);
      setErrorMessage(error?.response?.data?.message);
    }
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
                {...register("category")}
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

export default CategoryModal;
