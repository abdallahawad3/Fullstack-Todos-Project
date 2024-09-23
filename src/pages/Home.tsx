import Todo from "../components/Todo";
import Button from "../components/ui/Button";
import useAuthenticationQuery from "../hooks/useAuthenticationQuery";
// LocalStorage..🛅
const userDataString = localStorage.getItem("user");

const HomePage = () => {
  // States..🗽
  const { jwt } = userDataString ? JSON.parse(userDataString) : null;
  const { isLoading, data } = useAuthenticationQuery({
    queryKey: ["todos"],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "Application/json",
      },
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
