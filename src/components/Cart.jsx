import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
const Cart = () => {
  // Dummy data
  const cartItems = [
    {
      id: 1,
      name: "Product 1",
      img: "https://cdn.pixabay.com/photo/2023/03/27/16/24/sports-car-7881150_1280.jpg",
      price: "500",
    },
    {
      id: 2,
      name: "Product 2",
      img: "https://cdn.pixabay.com/photo/2023/03/27/16/24/sports-car-7881150_1280.jpg",
      price: "500",
    },
    // Add more products as needed
  ];

  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-4" className="drawer-button">
            <AiOutlineShoppingCart className="text-2xl " />
            <span className="badge badge-sm indicator-item">{8}</span>
          </label>
        </div>
        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="p-4 w-80 min-h-full bg-base-200 text-base-content mx-2 px-3 py-2">
            {/* Sidebar content here */}
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg border border-black px-2 py-2">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">{item.name}</span>
                    <span className="font-semibold text-sm">{item.price}</span>
                    <div className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <button className="text-gray-900 px-2 py-3 text-2xl">
                  <TiDeleteOutline />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cart;
