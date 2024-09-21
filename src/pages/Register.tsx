import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import InputErrorMessage from "../components/ErrorMessage";
import { REGISTER_FORM } from "../data";
interface IFormInput {
  username: string;
  email: string;
  password: string;
}
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  //** Handlers

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

        <Button fullWidth>Register Now</Button>
      </form>
    </div>
  );
};

export default Register;
