import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import logo from "../assets/logo.png";
import avatar from "../assets/logo.svg";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import Button from "./ui/Button";
import toast from "react-hot-toast";

const navigation = [
  { name: "HOME", to: "/", current: false },
  { name: "PROFILE", to: "/profile", current: false },
];

const userDataString = localStorage.getItem("user");
const userData = userDataString ? JSON.parse(userDataString) : null;

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  // Handlers
  const onLogout = () => {
    location.replace("/");
    toast.success("You logout.!", {
      duration: 1500,
    });
    localStorage.removeItem("user");
  };
  // Renders
  const navbarLinks = navigation.map((item) => (
    <NavLink
      key={item.name}
      to={item.to}
      aria-current={item.current ? "page" : undefined}
      className={classNames(
        item.current
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white",
        "block rounded-md px-3 py-2 text-base font-medium"
      )}>
      {item.name}
    </NavLink>
  ));

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
            <div className="flex flex-shrink-0 flex-1 items-center justify-end sm:justify-normal ">
              <Link to={"/"}>
                <img alt="Your Company" src={logo} className="h-8 w-auto" />
              </Link>
            </div>
            <div className="hidden  sm:block">
              <div className="flex space-x-4">
                {userData?.jwt ? (
                  <>
                    {navbarLinks}
                    <Link to={"/profile"}>
                      <img
                        className="w-10 h-10 bg-emerald-50 rounded-full "
                        src={avatar}
                        alt="Hello fci"
                      />
                    </Link>
                    <Button onClick={onLogout} variant={"danger"} className="p-2">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      to={"/login"}
                      className="bg-blue-600 py-1 rounded-sm  text-white hover:bg-blue-700">
                      Login
                    </Link>
                    <Link
                      to={"/register"}
                      className="bg-emerald-600 py-1 rounded-sm  text-white hover:bg-emerald-700">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {userData?.jwt ? (
            <>
              {navbarLinks}
              <Button onClick={onLogout} variant={"danger"} className="p-2" fullWidth>
                Logout
              </Button>
            </>
          ) : (
            <div className="flex flex-col space-y-3 ">
              <Link
                to={"/login"}
                className="bg-blue-600 py-1 rounded-sm px-2 text-white hover:bg-blue-700 w-fit">
                Login
              </Link>
              <Link
                to={"/register"}
                className="bg-emerald-600 py-1 rounded-sm px-2 text-white hover:bg-emerald-700 w-fit">
                Register
              </Link>
            </div>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
