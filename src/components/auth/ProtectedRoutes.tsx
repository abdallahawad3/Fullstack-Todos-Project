import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface IProps {
  isAllowed: boolean;
  children: ReactNode;
  redirectPath: string;
  data?: unknown;
}

const ProtectedRoutes = ({ children, isAllowed, redirectPath, data }: IProps) => {
  return isAllowed ? children : <Navigate to={redirectPath} state={data} />;
};

export default ProtectedRoutes;
