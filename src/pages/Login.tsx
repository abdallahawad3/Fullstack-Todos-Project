import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Login = () => {
  return (
    <div className="max-w-sm sm:max-w-md mx-auto center-h flex flex-col justify-center">
      <h1 className="text-center  font-semibold text-lg bg-black text-white p-2 rounded-md mb-3">
        Login To Access
      </h1>
      <form className="space-y-3">
        <div className="space-y-1">
          <label htmlFor=""> Email </label>
          <Input type="email" />
        </div>
        <div>
          <label htmlFor=""> Password </label>
          <Input type="password" />
        </div>
        <Button fullWidth>Login Now</Button>
      </form>
    </div>
  );
};

export default Login;
