import axiosInstance from "../config/axios.config";
import Todo from "../components/Todo";
import Button from "../components/ui/Button";
import { useQuery } from "@tanstack/react-query";
import type { ITodo } from "../interfaces";
// LocalStorage..🛅
const userDataString = localStorage.getItem("user");

const HomePage = () => {
  // States..🗽

  const { jwt } = userDataString ? JSON.parse(userDataString) : null;
  const { isLoading, data } = useQuery<ITodo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/users/me?populate=todos", {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "Application/json",
        },
      });
      return data.todos;
    },
  });
  // Renders...🔃

  if (isLoading) return <h3>Loading....</h3>;
  const RenderTodo = data && data.map((ele, idx) => <Todo idx={idx + 1} todo={ele} key={ele.id} />);

  return (
    <section className="center-h flex items-center justify-center">
      <div className="w-[100vw] space-y-3">
        <div className="flex justify-center">
          <Button>ADD TODO</Button>
        </div>
        <div className="space-y-3">{data?.length ? RenderTodo : <h1> Not Todos Yet.!😅</h1>}</div>
      </div>
    </section>
  );
};

export default HomePage;
