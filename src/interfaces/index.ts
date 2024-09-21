export interface IRegisterInput {
  name: "email" | "username" | "password";
  label: string;
  type: string;
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}
