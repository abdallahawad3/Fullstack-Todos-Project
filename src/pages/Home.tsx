import { useState, type ChangeEvent, type FormEvent } from "react";
import Todo from "../components/Todo";
import Button from "../components/ui/Button";
import useAuthenticationQuery from "../hooks/useAuthenticationQuery";
import type { ITodo } from "../interfaces";
import TodoSkeleton from "../components/TodoSkeleton";
import axiosInstance from "../config/axios.config";
import Modal from "../components/ui/Modal";
import MyTextarea from "../components/ui/Textarea";
import Input from "../components/ui/Input";

// LocalStorage..🛅
const userDataString = localStorage.getItem("user");

const HomePage = () => {
  // States..🗽
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [isAddTodoModal, setIsAddTodoModal] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<ITodo>({ title: "", description: "", documentId: "" });
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const { isLoading, data } = useAuthenticationQuery({
    queryKey: ["todos", editTodo.title],
    url: "/todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
        "Content-Type": "Application/json",
      },
    },
  });

  const onCloseAddTodoModal = () => {
    setIsAddTodoModal(false);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTodo((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { status } = await axiosInstance.post(
        "/todos",
        {
          data: {
            title: newTodo.title,
            description: newTodo.description,
            // user: [userData.user.id],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
            "Content-Type": "Application/json",
          },
        }
      );
      if (status == 201) {
        setIsAddTodoModal(false);
        location.reload();
        setNewTodo({ title: "", description: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handlers....🫱🏼‍🫲🏼

  // Renders...🔃

  if (isLoading) <TodoSkeleton />;
  const RenderTodo =
    data?.length &&
    data.map((ele, idx) => (
      <Todo setEditTodo={setEditTodo} idx={idx + 1} todo={ele} key={ele.documentId} />
    ));

  return (
    <section className="mt-20 flex items-center justify-center">
      <div className="w-[100vw] space-y-3">
        <div className="flex justify-center">
          <Button
            onClick={() => {
              setIsAddTodoModal(true);
            }}>
            ADD TODO
          </Button>
        </div>
        <div className="space-y-3">{data?.length ? RenderTodo : <h1> Not Todos Yet.!😅</h1>}</div>
      </div>
      {/* Add Todo Modal */}
      <Modal isOpen={isAddTodoModal} setOpenAndClose={onCloseAddTodoModal} title="ADD NEW TODO">
        <form onSubmit={onSubmitHandler}>
          <div>
            <p className="text-sm/6 font-medium mb-1">Title</p>
            <Input name="title" value={newTodo.title} onChange={onChangeHandler} />
          </div>
          <MyTextarea name="description" value={newTodo.description} onChange={onChangeHandler} />

          <div className="flex items-center space-x-2 mt-2">
            <Button isLoading={isLoading} type="submit" fullWidth variant={"default"}>
              Add
            </Button>
            <Button onClick={onCloseAddTodoModal} fullWidth variant={"cancel"}>
              cancel
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default HomePage;
