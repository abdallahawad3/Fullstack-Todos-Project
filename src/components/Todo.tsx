import { useState } from "react";
import Button from "./ui/Button";

interface IProps {
  todo: {
    title: string;
    description: string;
  };
  idx: number;
}

const Todo = ({ todo, idx }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="font-semibold border-2 max-w-lg mx-auto shadow-lg hover:bg-gray-200 hover:border-gray-200 p-2 rounded-md space-y-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button className="p-[7px]" variant={"default"}>
          Edit
        </Button>
        <Button className="p-[7px]" variant={"danger"}>
          Remove
        </Button>
      </div>
      {/* Body */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-md text-black">
            {idx}- {todo.title}
          </h1>
          <span>
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 cursor-pointer"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
              </svg>
            ) : (
              <svg
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            )}
          </span>
        </div>
        {isOpen == true && <p className="text-gray-500">{todo.description}</p>}
      </div>
    </div>
  );
};

export default Todo;
