import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import type { IRegisterInputs } from "../interfaces";
import InputErrorMessage from "../components/ErrorMessage";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterInputs>();
  const onSubmit: SubmitHandler<IRegisterInputs> = (data) => console.log(data);

  return (
    <div className="max-w-sm sm:max-w-md mx-auto center-h flex flex-col justify-center">
      <h1 className="text-center font-semibold text-lg bg-black text-white p-2 rounded-md mb-3">
        Register To Access
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="space-y-1">
          <label htmlFor=""> Email </label>
          <Input
            {...register("email", {
              required: "The Email is required",
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            })}
            aria-invalid={errors.email ? "true" : "false"}
            type="email"
          />
          {errors.email?.type === "pattern" && <InputErrorMessage msg="Enter Valid email" />}
          {errors.email?.type === "required" && <InputErrorMessage msg="The Email is Required" />}
        </div>
        <div className="space-y-1">
          <label htmlFor=""> Username </label>
          <Input
            {...register("username", { minLength: 5 })}
            type="text"
            aria-invalid={errors.username?.type == "min" ? "true" : "false"}
          />
          {errors.username && (
            <InputErrorMessage msg="The username must have 5 character at least" />
          )}
        </div>
        <div>
          <label htmlFor=""> Password </label>
          <Input
            {...register("password", {
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            })}
            type="password"
          />
          <InputErrorMessage />
        </div>

        <Button fullWidth>Register Now</Button>
      </form>
    </div>
  );
};

export default Register;
