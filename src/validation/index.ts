import * as yup from "yup";

const RegisterSchema = yup
  .object({
    username: yup
      .string()
      .required("Username is required")
      .min(5, "Username should be at least 5 character"),
    email: yup
      .string()
      .required("email is required")
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter valid email"),
    password: yup
      .string()
      .required("Password is required")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Enter a valid password"),
  })
  .required();

export { RegisterSchema };