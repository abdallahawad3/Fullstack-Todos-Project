import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <main>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
