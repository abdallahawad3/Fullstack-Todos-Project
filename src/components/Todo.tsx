import { useState, type ChangeEvent, type FormEvent } from "react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import MyTextarea from "./ui/Textarea";
import type { ITodo } from "../interfaces";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";

interface IProps {
  todo: {
    title: string;
    description: string;
    documentId: string;
  };
  setEditTodo: (todo: ITodo) => void;
  idx: number;
}

const Todo = ({ todo, idx, setEditTodo }: IProps) => {
  // States..🗽
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<ITodo>({
    description: "",
    title: "",
    documentId: "",
  });

  const userDataString = localStorage.getItem("user");
  const { jwt } = userDataString ? JSON.parse(userDataString) : null;

  // Handlers..🔥🔥

  const onCloseEditModal = () => {
    setIsEditModal(false);
    setTodoToEdit({ description: "", documentId: "", title: "" });
  };
  const onOpenEditModal = () => {
    setIsEditModal(true);
    setTodoToEdit(todo);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTodoToEdit((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitEdit = async (e: FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    setEditTodo(todoToEdit);
    setIsLoading(true);
    try {
      const { status } = await axiosInstance.put(
        `/todos/${id}`,
        {
          data: {
            title: todoToEdit.title,
            description: todoToEdit.description,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (status) {
        toast.success("UPDATED TODO SUCCESSFULLY", {
          duration: 1000,
          position: "top-center",
        });
        onCloseEditModal();
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="font-semibold border-2 max-w-lg mx-auto shadow-lg hover:bg-gray-200 hover:border-gray-200 p-2 rounded-md space-y-1">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button onClick={onOpenEditModal} className="p-[7px]" variant={"default"}>
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
      {/* // Edit Modal */}
      <Modal isOpen={isEditModal} setOpenAndClose={onCloseEditModal} title="Edit Modal">
        <form
          onSubmit={(e) => {
            onSubmitEdit(e, todoToEdit.documentId);
          }}>
          <div>
            <p className="text-sm/6 font-medium mb-1">Title</p>
            <Input name="title" value={todoToEdit.title} onChange={onChangeHandler} />
          </div>
          <MyTextarea
            name="description"
            value={todoToEdit.description}
            onChange={onChangeHandler}
          />

          <div className="flex items-center space-x-2 mt-2">
            <Button isLoading={isLoading} type="submit" fullWidth variant={"default"}>
              Update
            </Button>
            <Button onClick={onCloseEditModal} fullWidth variant={"cancel"}>
              cancel
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Todo;
