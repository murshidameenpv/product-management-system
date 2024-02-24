import { FaUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import Cart from "./Cart";
import useAuth from "../hooks/useAuth";


const Topbar = () => {
    const { isAuthenticated, 
logOut } = useAuth();
  return (
    <div className="flex items-center justify-between bg-navblue p-4">
      <div className="w-1/3"></div>
      <div className="w-1/3 flex items-center justify-center">
        <div className="flex items-center border-2 bg-white rounded-xl rounded-r-sm py-2 px-10">
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
        <div className="bg-yellow rounded-xl rounded-l-none py-2 border-2 border-yellow px-6">
          <button>Search</button>
        </div>
      </div>
      <div className="w-1/3 flex items-center justify-end gap-8 text-white">
        <div className="indicator">
          <FaRegHeart className="text-2xl" />
          {isAuthenticated ? (
            <span className="badge badge-sm indicator-item">{8}</span>
          ) : (
            <span className="badge badge-sm indicator-item">0</span>
          )}
        </div>

        {!isAuthenticated ? (
          <div className="indicator">
            <AiOutlineShoppingCart className="text-2xl " />
            <span className="badge badge-sm indicator-item">{0}</span>
          </div>
        ) : (
          <div className="indicator">
            <Cart />
          </div>
        )}

        <FaUser className="text-2xl" />
        <div onClick={logOut}>
        <IoIosLogOut className="text-2xl" />
        </div>
      </div>
    </div>
  );
}
export default Topbar;
