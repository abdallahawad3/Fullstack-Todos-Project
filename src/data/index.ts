import type { ILoginInput, IRegisterInput } from "../interfaces";

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

export const LOGIN_FORM: ILoginInput[] = [
  {
    label: "Email",
    type: "email",
    name: "identifier",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
  },
];
