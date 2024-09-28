import { useState, type ChangeEvent } from "react";
import Todo from "../components/Todo";
import Button from "../components/ui/Button";
import useAuthenticationQuery from "../hooks/useAuthenticationQuery";
import TodoSkeleton from "../components/TodoSkeleton";
import axiosInstance from "../config/axios.config";
import Modal from "../components/ui/Modal";
import MyTextarea from "../components/ui/Textarea";
import Input from "../components/ui/Input";
import { POST_NEW_TODO } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import type { IAddNewTodo } from "../interfaces";
import { useForm, type SubmitHandler } from "react-hook-form";
import InputErrorMessage from "../components/ErrorMessage";

// LocalStorage..🛅
const userDataString = localStorage.getItem("user");

const HomePage = () => {
  // States..🗽
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [isAddTodoModal, setIsAddTodoModal] = useState<boolean>(false);
  const [queryVersion, setQueryVersion] = useState(1);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const { isLoading, data } = useAuthenticationQuery({
    queryKey: [`todos-${queryVersion}`],
    url: "/users/me?populate=*",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
        "Content-Type": "Application/json",
      },
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddNewTodo>({
    resolver: yupResolver(POST_NEW_TODO),
  });

  const onCloseAddTodoModal = () => {
    setIsAddTodoModal(false);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTodo((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler: SubmitHandler<IAddNewTodo> = async (data) => {
    try {
      const { status } = await axiosInstance.post(
        "/todos",
        {
          data: {
            ...data,
            user: {
              id: userData.user.id,
            },
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
        setQueryVersion(queryVersion + 1);
        {
          data.title = "";
          data.description = "";
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handlers....🫱🏼‍🫲🏼

  // Renders...🔃

  if (isLoading) {
    <TodoSkeleton />;
    return;
  }
  const RenderTodo =
    data?.length &&
    data.map((ele, idx) => (
      <Todo
        version={queryVersion}
        queryVersion={setQueryVersion}
        idx={idx + 1}
        todo={ele}
        key={ele.documentId}
      />
    ));

  return (
    <section className="mx-auto min-h-[710px]  py-20">
      <div className="space-y-3">
        <div className="flex justify-center">
          <Button
            onClick={() => {
              setIsAddTodoModal(true);
            }}>
            ADD TODO
          </Button>
        </div>
        <div className="space-y-3">
          {data?.length ? (
            RenderTodo
          ) : (
            <h1 className="text-gray-800 container text-lg font-semibold"> Not Todos Yet.!😅</h1>
          )}
        </div>
      </div>
      {/* Add Todo Modal */}
      <Modal isOpen={isAddTodoModal} setOpenAndClose={onCloseAddTodoModal} title="ADD NEW TODO">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div>
            <p className="text-sm/6 font-medium mb-1">Title</p>
            <Input {...register("title")} type={"text"} />
            <InputErrorMessage msg={errors["title"]?.message} />
          </div>
          <MyTextarea
            {...register("description")}
            value={newTodo.description}
            onChange={onChangeHandler}
          />
          <InputErrorMessage msg={errors["description"]?.message} />

          <div className="flex items-center space-x-2 mt-2">
            <Button isLoading={isLoading} type="submit" fullWidth variant={"default"}>
              Add
            </Button>
            <Button type="button" onClick={onCloseAddTodoModal} fullWidth variant={"cancel"}>
              cancel
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default HomePage;
