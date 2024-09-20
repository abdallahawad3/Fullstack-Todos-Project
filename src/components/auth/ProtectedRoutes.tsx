import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface IProps {
  isAllowed: boolean;
  children: ReactNode;
  redirectPath: string;
}

const ProtectedRoutes = ({ children, isAllowed, redirectPath }: IProps) => {
  return isAllowed ? children : <Navigate to={redirectPath} />;
};

export default ProtectedRoutes;
