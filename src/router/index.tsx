import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../Layouts/Root";
import HomePage from "../pages/Home";
import Todos from "../pages/Todos";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PageNotFound from "../pages/PageNoutFound";
import ProtectedRoutes from "../components/auth/ProtectedRoutes";

const isAllowed = false;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <ProtectedRoutes isAllowed={isAllowed} redirectPath="/login">
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
