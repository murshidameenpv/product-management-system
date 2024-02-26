/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation } from "../utils/yupValidation.js";
import { useState } from "react";
import useAuth from "../hooks/useAuth.jsx";
import bgImage from '../../public/bg.png'

const Signup = () => {
  const {createUser,user} = useAuth()
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validation),
    autoComplete: "off",
  });
  const onSubmit = async (data) => {
    try {
     const response = await createUser(data.email, data.password,data.userName);
      if (response.status === 200) navigate("/");
      reset();
    } catch (error) {
      console.log(error, "Error Signing up");
      setErrorMessage(error?.response?.data?.message);
    }
  };
  if (user) {
    navigate("/");
    return null;
  }
  return (
    <div className="flex w-screen h-screen">
      <div
        className="w-2/5 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="p-10 text-white flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">WELCOME BACK</h1>
          <p className="mb-4">
            To keep connected with us please login with your personal info !
          </p>
          <Link to="/login">
            <button className="text-white py-3 px-16 rounded-3xl border border-white bg-transparent hover:bg-yellow hover:text-black hover:border-black">
              Sign In
            </button>
          </Link>
        </div>
      </div>
      <div className="w-3/5 p-10 flex items-center justify-center flex-col">
        <h1 className="text-4xl mb-4 font-bold text-yellow mt-14">
          Create Account
        </h1>
        <form className="card-body w-[350px]" onSubmit={handleSubmit(onSubmit)}>
          {/* name */}
          <div className="form-control">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Username"
                {...register("userName")}
              />
            </label>
            {errors?.userName && (
              <p className="px-2 py-2 text-red-800">
                {errors?.userName?.message}
              </p>
            )}
          </div>
          {/* Email */}
          <div className="form-control">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                {...register("email")}
              />
            </label>
            {errors?.email && (
              <p className="px-2 py-2 text-red-800">{errors?.email?.message}</p>
            )}
          </div>
          {/* password */}
          <div className="form-control">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                {...register("password", { required: true })}
              />
            </label>
            {errors?.password && (
              <p className="text-red-800">{errors?.password?.message}</p>
            )}
          </div>
          <div>
            {errorMessage && <p className="p-2 text-red-700">{errorMessage}</p>}
          </div>
          {/* signup button */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Signup"
              className="text-white py-3 px-16 rounded-3xl border bg-yellow hover:bg-amber-400"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
