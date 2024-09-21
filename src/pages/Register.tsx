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
import { useNavigate } from "react-router-dom";

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
          style: { backgroundColor: "black", color: "white", width: "fit-content" },
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      const messageTxt = errorObj.response?.data.error.message;
      toast.error(`${messageTxt}`, {
        position: "bottom-center",
      });
    } finally {
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
    <div className="max-w-sm sm:max-w-md mx-auto center-h flex flex-col justify-center">
      <h1 className="text-center font-semibold text-lg bg-black text-white p-2 rounded-md mb-3">
        Register To Access
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {renderRegisterInputs}
        <Button fullWidth isLoading={isLoading}>
          Register Now
        </Button>
      </form>
    </div>
  );
};

export default Register;
