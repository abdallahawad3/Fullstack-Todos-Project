import type { IRegisterInput } from "../interfaces";

export const REGISTER_FORM: IRegisterInput[] = [
  {
    label: "Email",
    type: "email",
    name: "email",
    validation: {
      required: true,
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
  },
  {
    label: "Username",
    type: "text",
    name: "username",
    validation: {
      required: true,
      minLength: 5,
    },
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    validation: {
      required: true,
      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    },
  },
];

// <div className="space-y-1">
//   <label htmlFor=""> Email </label>
//   <Input
// {...register("email", {
//   required: "The Email is required",
//   pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
// })}
//     aria-invalid={errors.email ? "true" : "false"}
//     type="email"
//   />
//   {errors.email?.type === "pattern" && <InputErrorMessage msg="Enter Valid email" />}
//   {errors.email?.type === "required" && <InputErrorMessage msg="The Email is Required" />}
// </div>;
