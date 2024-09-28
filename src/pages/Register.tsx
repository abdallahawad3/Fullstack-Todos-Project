import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import InputErrorMessage from "../components/ErrorMessage";
import { REGISTER_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { useState } from "react";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "../interfaces";
import { Link, useNavigate } from "react-router-dom";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}
const Register = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(RegisterSchema) });
  //** Handlers //
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);

    try {
      const { status } = await axiosInstance.post("/auth/local/register", data);
      if (status == 200) {
        toast.success("Register Success, You will navigate to login page after 2s", {
          position: "bottom-center",
          duration: 1500,
          style: { backgroundColor: "black", color: "white", width: "fit-content" },
        });
        setTimeout(() => {
          setIsLoading(false);
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      const messageTxt = errorObj.response?.data.error.message;
      toast.error(`${messageTxt}`, {
        position: "bottom-center",
      });
      setIsLoading(false);
    }
  };
  //**Renders
  const renderRegisterInputs = REGISTER_FORM.map((ele) => (
    <div className="space-y-1" key={ele.name}>
      <label htmlFor={ele.name}> {ele.label} </label>
      <Input
        id={ele.name}
        {...register(ele.name, {
          required: ele.validation.required,
          minLength: ele.validation.minLength,
          pattern: ele.validation.pattern,
        })}
        aria-invalid={errors.email ? "true" : "false"}
        type={ele.type}
      />
      {errors[ele.name] && <InputErrorMessage msg={errors[ele.name]?.message} />}
    </div>
  ));
  return (
    <div className=" center-h flex justify-center items-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <div className="w-[500px] px-2 md:w-[600px] md:px-0">
        <h1 className="text-center font-semibold text-lg bg-black text-white p-2 rounded-md mb-3">
          Register To Access
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {renderRegisterInputs}
          <Button fullWidth isLoading={isLoading}>
            Register Now
          </Button>
        </form>
        <div className="flex items-center justify-center mt-3 gap-2 text-white">
          <span>Have account?</span>
          <Link className="text-blue-800 text-sm font-semibold underline" to="/login">
            Login<span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
