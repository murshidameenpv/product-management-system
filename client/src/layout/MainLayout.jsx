import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import "./MainLayout.css";

const MainLayout = () => {
    return (
      <div>
          <Topbar/>
          <div className="min-h-screen">
            <Outlet />
          </div>
          <Footer />
      </div>
    );
};

export default MainLayout;
