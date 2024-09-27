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

export interface ILoginInput {
  name: "identifier" | "password";
  label: string;
  type: string;
}
export interface IErrorResponse {
  error: {
    details?: {
      errors: {
        message: string;
      }[];
    };
    message?: string;
  };
}

export interface ITodo {
  documentId: string;
  title: string;
  description: string;
}

export interface IAddNewTodo {
  title: string;
  description: string;
}
