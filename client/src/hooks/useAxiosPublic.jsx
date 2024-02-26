import axios from "axios";
const axiosPublic = axios.create({
  baseURL: "https://product-management-system-sgdt.onrender.com",
});
function useAxiosPublic() {
  return axiosPublic;
}
export default useAxiosPublic;
