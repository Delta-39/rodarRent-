import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import validateEdit from "./validateEdit";

import {
  getCustomerDetailsUrl,
  updateCustomerInfoUrl,
  updatePasswordUrl,
} from "../../helpers/routes";
// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCustomer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [editedFields, setEditedFields] = useState({
    id: "",
    name: "",
    lastName: "",
    personalId: "",
    birthDate: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    phoneNumber: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    id: "",
    name: "",
    lastName: "",
    personalId: "",
    birthDate: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    phoneNumber: "",
    email: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await fetch(getCustomerDetailsUrl(id));
        const data = await response.json();
        setCustomer(data);
        setErrors(validateEdit(data));
        setIsLoading(false);
      } catch (error) {
        console.error("Error", error);
        setIsLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [id]);

  useEffect(() => {
    if (customer) {
      setEditedFields({
        ...customer,
      });
      setErrors(
        validateEdit({
          ...customer,
        })
      );
    }
  }, [customer]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedFields({ ...editedFields, [name]: value });
    setErrors(validateEdit({ ...editedFields, [name]: value }));
  };

  const handleSaveAndBack = async () => {
    if (isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(updateCustomerInfoUrl(id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedFields),
      });

      if (response.status === 200) {
        toast.success("Customer information updated successfully", {
          autoClose: 3000,
        });

        setTimeout(() => {
          window.location.reload();
          setIsSaving(false);
        }, 3000);
      } else {
        setIsSaving(false);
      }
    } catch (error) {
      console.error("Error", error);
      toast.error("Error inesperado");
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const hasErrors = () => {
    for (const errorKey in errors) {
      if (errors[errorKey]) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="w-full h-full bg-white dark:bg-slate-900 duration-300 dark:text-gray-100 flex items-center justify-center">
      <div className="w-120 drop-shadow-md border bg-white rounded-3xl focus:rounded-3xl dark:bg-slate-900">
        <form className=" w-120 px-16 py-5 flex flex-col flex-wrap  rounded-xl justify-center">
          <h1 className="font-poppins p-2 text-3xl">Edit your info</h1>
          <hr className="ml-8 mr-8 p-2 text-gray" />
          <div className="flex">
            <div className="w-2/4">
              <label
                className="font-poppins text-sm flex m-1 mb-0 justify-start"
                htmlFor="name"
              >
                Name
              </label>
              <div className="flex items-center">
                <input
                  className="w-10/12 font-poppins text-sm flex justify-start items-center p-1 m-1 text-black rounded-lg drop-shadow-md border border-gray "
                  type="text"
                  name="name"
                  value={editedFields.name}
                  onChange={handleFieldChange}
                />
                <span
                  className={
                    errors.name
                      ? "font-poppins text-ls flex m-1 justify-start text-red"
                      : null
                  }
                >
                  {errors.name}
                </span>
              </div>
            </div>
            <div className="w-2/4">
              <label
                className="font-poppins text-sm flex m-1 mb-0 justify-start"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <div className="flex items-center">
                <input
                  className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
                  type="text"
                  name="lastName"
                  value={editedFields.lastName}
                  onChange={handleFieldChange}
                />
                <span
                  className={
                    errors.lastName
                      ? "font-poppins text-ls flex m-1 justify-start text-red"
                      : null
                  }
                >
                  {errors.lastName}
                </span>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-2/4">
              <label
                className="font-poppins text-sm flex m-1 mb-0 justify-start"
                htmlFor="email"
              >
                E-mail
              </label>
              <div className="flex items-center">
                <input
                  className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
                  type="text"
                  name="email"
                  value={editedFields.email}
                  onChange={handleFieldChange}
                />
                <span
                  className={
                    errors.email
                      ? "font-poppins text-ls flex m-1 justify-start text-red"
                      : null
                  }
                >
                  {errors.email}
                </span>
              </div>
              <span
                className={
                  errors.emailMsj
                    ? "font-poppins text-ls flex m-1 justify-start text-red"
                    : null
                }
              >
                {errors.emailMsj}
              </span>
            </div>
            <div className="w-2/4">
              <label
                className="font-poppins text-sm flex m-1 mb-0 justify-start"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <div className="flex items-center">
                <input
                  className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
                  type="text"
                  name="phoneNumber"
                  value={editedFields.phoneNumber}
                  onChange={handleFieldChange}
                />
                <span
                  className={
                    errors.phoneNumber
                      ? "font-poppins text-ls flex m-1 justify-start text-red"
                      : null
                  }
                >
                  {errors.phoneNumber}
                </span>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-2/4">
              <label
                className="font-poppins text-sm flex m-1 mb-0 justify-start"
                htmlFor="personalId"
              >
                PersonalID
              </label>
              <div className="flex items-center">
                <input
                  className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
                  type="text"
                  name="personalId"
                  value={editedFields.personalId}
                  onChange={handleFieldChange}
                />
                <span
                  className={
                    errors.personalId
                      ? "font-poppins text-ls flex m-1 justify-start text-red"
                      : null
                  }
                >
                  {errors.personalId}
                </span>
              </div>
            </div>
            <div className="w-2/4">
              <label
                className="font-poppins text-sm flex m-1 mb-0 justify-start"
                htmlFor="birthDate"
              >
                Birth Date
              </label>
              <div className="flex items-center">
                <input
                  className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
                  type="date"
                  name="birthDate"
                  value={editedFields.birthDate}
                  onChange={handleFieldChange}
                />
                <span
                  className={
                    errors.birthDate
                      ? "font-poppins text-ls flex m-1 justify-start text-red"
                      : null
                  }
                >
                  {errors.birthDate}
                </span>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-2/4">
              <label
                className="font-poppins text-sm flex m-1 mb-0 justify-start"
                htmlFor="country"
              >
                Country
              </label>
              <div className="flex items-center">
                <input
                  className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
                  type="text"
                  name="country"
                  value={editedFields.country}
                  onChange={handleFieldChange}
                />
                <span
                  className={
                    errors.country
                      ? "font-poppins text-ls flex m-1 justify-start text-red"
                      : null
                  }
                >
                  {errors.country}
                </span>
              </div>
            </div>
            <div className="w-2/4">
              <label
                className="font-poppins text-sm flex m-1 mb-0 justify-start"
                htmlFor="city"
              >
                City
              </label>
              <div className="flex items-center">
                <input
                  className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
                  type="text"
                  name="city"
                  value={editedFields.city}
                  onChange={handleFieldChange}
                />
                <span
                  className={
                    errors.city
                      ? "font-poppins text-ls flex m-1 justify-start text-red"
                      : null
                  }
                >
                  {errors.city}
                </span>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-2/4">
              <label
                className="font-poppins text-sm flex m-1 mb-0 justify-start"
                htmlFor="address"
              >
                Address
              </label>
              <div className="flex items-center">
                <input
                  className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
                  type="text"
                  name="address"
                  value={editedFields.address}
                  onChange={handleFieldChange}
                />
                <span
                  className={
                    errors.address
                      ? "font-poppins text-ls flex m-1 justify-start text-red"
                      : null
                  }
                >
                  {errors.address}
                </span>
              </div>
            </div>
            <div className="w-2/4">
              <label
                className="font-poppins text-sm flex m-1 mb-0 justify-start"
                htmlFor="zipCode"
              >
                Zip Code
              </label>
              <div className="flex items-center">
                <input
                  className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
                  type="text"
                  name="zipCode"
                  value={editedFields.zipCode}
                  onChange={handleFieldChange}
                />
                <span
                  className={
                    errors.zipCode
                      ? "font-poppins text-ls flex m-1 justify-start text-red"
                      : null
                  }
                >
                  {errors.zipCode}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-4 mb-4">
            <button
              className="font-poppins bg-blue cursor-pointer rounded-lg p-1 m-2 text-white"
              onClick={handleSaveAndBack}
              disabled={hasErrors() || isSaving}
            >
              Save
            </button>
          </div>
        </form>
        {/* <ToastContainer
          position="top-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        /> */}
      </div>
    </div>
  );
};

export default EditCustomer;
