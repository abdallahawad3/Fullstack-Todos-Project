import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { LOGIN_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../validation";
import InputErrorMessage from "../components/ErrorMessage";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "../interfaces";
import { useState } from "react";
import { Link } from "react-router-dom";
interface IFormInput {
  identifier: string;
  password: string;
}
const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(LoginSchema),
  });

  //**  Handlers
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/auth/local", data);
      if (response.status === 200) {
        toast.success("You will navigate to the home page after 2 seconds.", {
          position: "bottom-center",
          duration: 1500,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });
        localStorage.setItem("user", JSON.stringify(response.data));
        setTimeout(() => {
          location.replace("/");
          setIsLoading(false);
        }, 2000);
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      const errorMsg = errorObj.response?.data.error.message;
      toast.error(`${errorMsg}`, {
        position: "bottom-center",
      });
      setIsLoading(false);
    }
  };

  //** Renders

  const RenderLoginInputs = LOGIN_FORM.map((input) => (
    <div key={input.name} className="space-y-1">
      <label htmlFor={input.name}> {input.label} </label>
      <Input {...register(input.name)} type={input.type} />
      <InputErrorMessage msg={errors[input.name]?.message} />
    </div>
  ));
  return (
    <div className="flex justify-center items-center center-h">
      <div className="w-[500px] px-2 md:w-[600px] md:px-0">
        <h1 className="text-center font-semibold text-lg bg-black text-white p-2 rounded-md mb-3">
          Login To Access
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {RenderLoginInputs}
          <Button isLoading={isLoading} fullWidth>
            Login Now
          </Button>
        </form>
        <div className="flex items-center justify-center mt-3 gap-2 text-gray-800">
          <span>Don't have account?</span>
          <Link className="text-blue-800 text-sm font-semibold underline" to="/register">
            Register
            <span className="" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
