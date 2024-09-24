import { useQuery } from "@tanstack/react-query";
import type { ITodo } from "../interfaces";
import axiosInstance from "../config/axios.config";
import type { AxiosRequestConfig } from "axios";

interface IAuthenticationQuery {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig;
}

const useAuthenticationQuery = ({ queryKey, url, config }: IAuthenticationQuery) => {
  return useQuery<ITodo[]>({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get(url, config);
      return data.data;
    },
  });
};

export default useAuthenticationQuery;
