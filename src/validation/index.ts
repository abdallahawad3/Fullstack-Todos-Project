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

const LoginSchema = yup.object({
  identifier: yup
    .string()
    .required("Email is required")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter valid email"),
  password: yup
    .string()
    .required("Password is required")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Enter a valid password"),
});

const POST_NEW_TODO = yup.object({
  title: yup.string().required("Title is required").min(5, "Title should be at least 5 character"),
  description: yup
    .string()
    .required("Description is required")
    .min(20, "Description should be at least 20 character"),
});

export { RegisterSchema, LoginSchema, POST_NEW_TODO };
