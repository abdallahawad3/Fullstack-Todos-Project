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
  queryVersion: (version: number) => void;
  version: number;
  idx: number;
}

const Todo = ({ todo, idx, queryVersion, version }: IProps) => {
  // States..🗽
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
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

  const onCloseDeleteModal = () => {
    setIsDeleteModal(false);
  };
  const onOpenDeleteModal = () => {
    setIsDeleteModal(true);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTodoToEdit((prev) => ({ ...prev, [name]: value }));
  };

  const onDelete = async (id: string) => {
    try {
      const { status } = await axiosInstance.delete(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (status) {
        queryVersion(version + 1);
        toast.success("DELETE TODO SUCCESSFULLY", {
          duration: 1000,
          position: "top-center",
        });
        onCloseDeleteModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitEdit = async (e: FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
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
        queryVersion(version + 1);
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
      <div
        className="font-semibold border-2 shadow-lg max-w-md md:max-w-lg lg:max-w-xl mx-auto hover:bg-gray-100 hover:border-gray-200 p-2 rounded-md space-y-1"
        style={
          isComplete ? { background: "#13bd52", color: "#fff !important" } : { background: "white" }
        }>
        {/* Body */}
        <div>
          <div className="flex items-center justify-between mb-2">
            {isOpen ? (
              <Button
                className="py-1"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}>
                Hide Details
              </Button>
            ) : (
              <Button
                className="py-1"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}>
                Show Details
              </Button>
            )}
            {isComplete ? (
              <span
                className="py-1 cursor-pointer"
                onClick={() => {
                  setIsComplete(!isComplete);
                }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-white">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </span>
            ) : (
              <span
                className="py-1 cursor-pointer"
                onClick={() => {
                  setIsComplete(!isComplete);
                }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-md text-black flex items-center gap-1">
              <span className="font-bold">{idx}</span>- {todo.title}
            </h1>
            <div className="flex gap-1">
              <Button onClick={onOpenEditModal} className="px-[17px] py-[5px]" variant={"default"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </Button>
              <Button onClick={onOpenDeleteModal} className="px-[10px] py-[5px]" variant={"danger"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </Button>
            </div>
          </div>
          {isOpen == true && <p className="text-slate-500 text-sm mx-4">{todo.description}</p>}
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
            <Button type="button" onClick={onCloseEditModal} fullWidth variant={"cancel"}>
              cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* DELETE MODAL..❌ */}
      <Modal isOpen={isDeleteModal} setOpenAndClose={onCloseDeleteModal} title="Delete TODO ">
        <p className="font-medium text-sm text-red-500">
          This action cannot be undone. This will permanently delete your account and remove your
          data from our servers.
        </p>

        <div className="flex mt-3 gap-2 flex-wrap sm:flex-nowrap ">
          <Button
            onClick={() => {
              onDelete(todo.documentId);
            }}
            fullWidth
            variant={"danger"}>
            Yes, Remove
          </Button>
          <Button onClick={onCloseDeleteModal} type="button" fullWidth variant={"cancel"}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Todo;
