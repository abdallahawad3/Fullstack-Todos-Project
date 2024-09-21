import { useEffect, useState } from "react";
import axiosInstance from "../config/axios.config";
import Todo from "../components/Todo";
import Button from "../components/ui/Button";
import type { ITodo } from "../interfaces";

const HomePage = () => {
  // States..🗽
  const [todos, setTodos] = useState<ITodo[]>([]);
  const userDataString = localStorage.getItem("user");
  const { jwt } = userDataString ? JSON.parse(userDataString) : null;

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get("/users/me?populate=todos", {
          headers: { "Content-Type": " application/json", Authorization: `Bearer ${jwt}` },
        });
        setTodos([...response.data.todos]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [jwt]);

  // Renders...🔃
  const RenderTodo = todos.map((ele, idx) => <Todo idx={idx + 1} todo={ele} key={ele.id} />);
  return (
    <section className="center-h flex items-center justify-center">
      <div className="w-[100vw] space-y-3">
        <div className="flex justify-center">
          <Button>ADD TODO</Button>
        </div>
        <div className="space-y-3">{RenderTodo}</div>
      </div>
    </section>
  );
};

export default HomePage;
