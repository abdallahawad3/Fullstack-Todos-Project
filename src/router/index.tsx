import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../Layouts/Root";
import HomePage from "../pages/Home";
import Todos from "../pages/Todos";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PageNotFound from "../pages/PageNotFound";
import ProtectedRoutes from "../components/auth/ProtectedRoutes";

const userDataString = localStorage.getItem("user");
const userData = userDataString ? JSON.parse(userDataString) : null;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <ProtectedRoutes isAllowed={userData?.jwt} redirectPath="/login" data={userData}>
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route path="todos" element={<Todos />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
