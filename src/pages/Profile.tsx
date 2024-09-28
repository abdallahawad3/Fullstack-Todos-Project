import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";

const Profile = () => {
  const userDataString = localStorage.getItem("user");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const [updateData, setUpdateData] = useState({
    firstname: "",
    lastname: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    (async () => {
      const { data } = await axiosInstance.get("/users/me?populate=*", {
        headers: {
          Authorization: `Bearer ${userData.jwt}`,
        },
      });
      if (data.firstname) {
        setUpdateData((prev) => ({
          ...prev,
          firstname: data.firstname,
          lastname: data.lastname,
          address: data.address,
          city: data.city,
          country: data.country,
          state: data.state,
          zip: data.zip,
        }));
      }
    })();
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { status } = await axiosInstance.put(`/users/${userData.user.id}`, updateData, {
        headers: {
          Authorization: `Bearer ${userData.jwt}`,
        },
      });

      if (status == 200) {
        toast.success("The Data Update");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandle}
      className="py-20 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% container">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-white ">Profile</h2>
          <p className="mt-1 leading-6 text-white ">Update Your Data</p>
        </div>
        <div className="mt-10 border-b pb-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
              Username
            </label>
            <div className="mt-2 space-y-2">
              <Input
                id="username"
                name="username"
                type="text"
                placeholder={userData.user.username}
                autoComplete="off"
                disabled
              />
            </div>
            <div className="sm:col-span-4 ">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                email
              </label>
              <div className="mt-2 space-y-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={userData.user.email}
                  autoComplete="off"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b pt-12 border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-white">Personal Information</h2>
        <p className="mt-1 text-sm leading-6 text-white">Update your information.✅</p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-white">
              First name
            </label>
            <div className="mt-2">
              <Input
                value={updateData.firstname}
                onChange={onChange}
                id="firstname"
                name="firstname"
                type="text"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-white">
              Last name
            </label>
            <div className="mt-2">
              <Input
                value={updateData.lastname}
                onChange={onChange}
                id="lastname"
                name="lastname"
                type="text"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-white">
              Country
            </label>
            <div className="mt-2">
              <Input id="country" name="country" onChange={onChange} value={updateData.country} />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-white">
              Street address
            </label>
            <div className="mt-2">
              <Input
                onChange={onChange}
                value={updateData.address}
                id="address"
                name="address"
                type="text"
                autoComplete="street-address"
              />
            </div>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label htmlFor="city" className="block text-sm font-medium leading-6 text-white">
              City
            </label>
            <div className="mt-2">
              <Input
                onChange={onChange}
                value={updateData.city}
                id="city"
                name="city"
                type="text"
                autoComplete="address-level2"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="state" className="block text-sm font-medium leading-6 text-white">
              State / Province
            </label>
            <div className="mt-2">
              <Input
                onChange={onChange}
                value={updateData.state}
                id="state"
                name="state"
                type="text"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="zip" className="block text-sm font-medium leading-6 text-white">
              ZIP / Postal code
            </label>
            <div className="mt-2">
              <Input
                value={updateData.zip}
                onChange={onChange}
                id="zip"
                name="zip"
                type="text"
                autoComplete="postal-code"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button type="submit">Update Profile </Button>
      </div>
    </form>
  );
};

export default Profile;
