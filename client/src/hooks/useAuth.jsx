import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}

export default useAuth;
