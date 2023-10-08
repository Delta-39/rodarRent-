import formImage from "../../assets/img/loginRegister/login.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import routesHelper, { API_BASE_URL } from "../../helpers/routes";
import validateRegister from "./validateRegister";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiErrorCircle } from "react-icons/bi";

function Register() {
  const navigate = useNavigate();
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const btnState = async (err) => {
    if (Object.keys(err).length === 0) setDisabledSubmit(false);
  };
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    personalId: "",
    birthDate: "",
    address: "",
    country: "",
    city: "",
    zipCode: "",
    phoneNumber: "",
    email: "",
    password: "",
    repeatPass: "",
  });

  const [showError, setShowError] = useState({
    email: false,
    password: false,
    repeatPass: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    personalId: "",
    birthDate: "",
    address: "",
    country: "",
    city: "",
    zipCode: "",
    phoneNumber: "",
    email: "",
    emailMsj: "",
    password: "",
    passwordMsj: "",
    repeatPass: "",
    repeatPassMsj: "",
    //requireMsj: "* (Require information)",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    validateRegister({ ...userData, [property]: value });
    setUserData({ ...userData, [property]: value });
    setErrors(validateRegister({ ...userData, [property]: value }));
    btnState(validateRegister({ ...userData, [property]: value }));
  };

  const data = {
    name: userData["name"],
    lastName: userData["lastName"],
    personalId: userData["personalId"],
    birthDate: userData["birthDate"],
    address: userData["address"],
    city: userData["city"],
    country: userData["country"],
    zipCode: userData["zipCode"],
    phoneNumber: userData["phoneNumber"],
    email: userData["email"],
    password: userData["password"],
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/customers`, data);
      toast.success("Registered user!", { position: "top-left" });

      setTimeout(() => {
        navigate("/login");
      }, 4000);

      const body = {
        userName: response.data.name,
        toEmailAddress: response.data.email,
        replyToEmailAddress: "rodarrentadm@outlook.com",
        subject: `Welcome ${response.data.name}`,
        template: "register",
      };

      await axios.post(`${API_BASE_URL}/sendemail`, body);
    } catch (error) {
      toast.error(error.response.data.error, { position: "top-left" });
    }
  };

  const handleGoogleReg = async (event) => {
    event.preventDefault();
    window.location.href = routesHelper.baseBackUrl + routesHelper.authGoogle;
  };

  return (
    <div className="w-full h-full bg-white dark:bg-slate-900 transition duration-300 dark:text-gray-100 flex items-center justify-center">
      <div className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-col md:justify-stretch sm:flex-col xs:flex-col">
        <div className="sm:drop-shadow-md sm:border bg-white 2xl:rounded-xl xl:rounded-xl lg:rounded-xl md:rounded-none dark:bg-slate-900">
          <form className="px-8 pt-0 sm:px-16 sm:pt-10 flex flex-col flex-wrap w-full md:w-full justify-center">
            <h1 className="font-poppins p-2 text-3xl">Welcome to RodarRent!</h1>
            <h6 className="font-poppins p-2 text-gray">
              Please enter your info
            </h6>
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
                    className="w-10/12 font-poppins text-sm flex justify-start items-center p-1 m-1 text-black rounded-lg drop-shadow-md border border-gray dark:bg-slate-950 dark:text-gray-100 "
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div>
                      <BiErrorCircle className="text-red text-xl" />
                    </div>
                  )}
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
                    className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray dark:bg-slate-950 dark:text-gray-100 "
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <div>
                      <BiErrorCircle className="text-red text-xl" />
                    </div>
                  )}
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
                    className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray dark:bg-slate-950 dark:text-gray-100 "
                    type="text"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                  />
                  {(errors.email || errors.emailMsj) && (
                    <div
                      className="relative"
                      onMouseEnter={() =>
                        setShowError({ ...showError, email: true })
                      }
                      onMouseLeave={() =>
                        setShowError({ ...showError, email: false })
                      }
                    >
                      <BiErrorCircle
                        className={`text-red text-xl ${
                          errors.emailMsj ? "cursor-pointer" : ""
                        }`}
                      />
                      {showError.email && errors.emailMsj && (
                        <div className=" bg-white w-32 border border-gray-300 text-red absolute rounded-lg -bottom-14 transform -translate-x-1/2 z-20 p-1">
                          {errors.emailMsj}
                        </div>
                      )}
                    </div>
                  )}
                </div>
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
                    className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray dark:bg-slate-950  dark:text-gray-100"
                    type="text"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                  />
                  {errors.phoneNumber && (
                    <div>
                      <BiErrorCircle className="text-red text-xl" />
                    </div>
                  )}
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
                    className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray dark:bg-slate-950 dark:text-gray-100 "
                    type="text"
                    name="personalId"
                    value={userData.personalId}
                    onChange={handleChange}
                  />
                  {errors.personalId && (
                    <div>
                      <BiErrorCircle className="text-red text-xl" />
                    </div>
                  )}
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
                    className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray dark:bg-slate-950 dark:text-gray-100"
                    type="date"
                    name="birthDate"
                    value={userData.birthDate}
                    onChange={handleChange}
                  />
                  {errors.birthDate && (
                    <div>
                      <BiErrorCircle className="text-red text-xl" />
                    </div>
                  )}
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
                    className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray dark:bg-slate-950 dark:text-gray-100 "
                    type="text"
                    name="country"
                    value={userData.country}
                    onChange={handleChange}
                  />
                  {errors.country && (
                    <div>
                      <BiErrorCircle className="text-red text-xl" />
                    </div>
                  )}
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
                    className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray dark:bg-slate-950 dark:text-gray-100 "
                    type="text"
                    name="city"
                    value={userData.city}
                    onChange={handleChange}
                  />
                  {errors.city && (
                    <div>
                      <BiErrorCircle className="text-red text-xl" />
                    </div>
                  )}
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
                    className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray dark:bg-slate-950 dark:text-gray-100 "
                    type="text"
                    name="address"
                    value={userData.address}
                    onChange={handleChange}
                  />
                  {errors.address && (
                    <div>
                      <BiErrorCircle className="text-red text-xl" />
                    </div>
                  )}
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
                    className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray dark:bg-slate-950 dark:text-gray-100 "
                    type="text"
                    name="zipCode"
                    value={userData.zipCode}
                    onChange={handleChange}
                  />
                  {errors.zipCode && (
                    <div>
                      <BiErrorCircle className="text-red text-xl" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="w-2/4">
                <label
                  className="font-poppins text-sm flex m-1 mb-0 justify-start"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="flex items-center">
                  <input
                    className="w-10/12 font-poppins text-sm text-black flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray dark:bg-slate-950 dark:text-gray-100 "
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                  />
                  {(errors.password || errors.passwordMsj) && (
                    <div
                      className="relative"
                      onMouseEnter={() =>
                        setShowError({ ...showError, password: true })
                      }
                      onMouseLeave={() =>
                        setShowError({ ...showError, password: false })
                      }
                    >
                      <BiErrorCircle
                        className={`text-red text-xl ${
                          errors.passwordMsj ? "cursor-pointer" : ""
                        }`}
                      />
                      {showError.password && errors.passwordMsj && (
                        <div className=" bg-white w-32 border font-semibold border-gray-300 text-red absolute rounded-lg -bottom-14 transform -translate-x-1/2 z-20 p-1 dark:bg-slate-950">
                          {errors.passwordMsj}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-2/4">
                <label
                  className="font-poppins text-sm flex m-1 justify-start"
                  htmlFor="repeatPass"
                >
                  Repeat Password
                </label>
                <div className="flex items-center">
                  <input
                    className="w-10/12 font-poppins text-sm text-black flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray dark:bg-slate-950 dark:text-gray-100 "
                    type="password"
                    name="repeatPass"
                    value={userData.repeatPass}
                    onChange={handleChange}
                  />
                  {(errors.repeatPass || errors.repeatPassMsj) && (
                    <div
                      className="relative"
                      onMouseEnter={() =>
                        setShowError({ ...showError, repeatPass: true })
                      }
                      onMouseLeave={() =>
                        setShowError({ ...showError, repeatPass: false })
                      }
                    >
                      <BiErrorCircle
                        className={`text-red text-xl ${
                          errors.repeatPassMsj ? "cursor-pointer" : ""
                        }`}
                      />
                      {showError.repeatPass && errors.repeatPassMsj && (
                        <div className=" bg-white w-32 border border-gray-300 text-red absolute rounded-lg -bottom-14 transform -translate-x-1/2 z-20 p-1">
                          {errors.repeatPassMsj}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-4 mb-4">
              <button
                className={
                  disabledSubmit
                    ? "font-poppins bg-blue cursor-not-allowed rounded-lg p-1 m-2 text-white"
                    : "font-poppins bg-blue cursor-pointer rounded-lg p-1 m-2 text-white"
                }
                onClick={handleSubmit}
                disabled={disabledSubmit}
              >
                Sign Up
              </button>
              <button
                onClick={handleGoogleReg}
                className="font-poppins text-black bg-white cursor-pointer rounded-lg p-1 m-2 flex flex-row justify-center items-center drop-shadow-md border border-gray dark:bg-slate-950 dark:text-gray-100 "
              >
                <img
                  className="relative w-6 m-1"
                  src="https://res.cloudinary.com/daiztctac/image/upload/v1694553181/pogqgaencfemfipzu7xo.png" //"../../src/assets/img/google_logo.png"
                  alt="Google img"
                ></img>
                Sign up with google
              </button>
            </div>
          </form>
          <hr className="ml-8 mr-8" />
          <div className="flex justify-center items-center m-5">
            <p className="font-poppins text-xs m-2">Already have an account?</p>
            <p className="text-sm underline decoration-solid font-poppins">
              <Link to={routesHelper.login}>Sign in</Link>
            </p>
          </div>
        </div>
        <div className="hidden sm:hidden  lg:flex xl:flex drop-shadow-md rounded-r-3xl flex-col justify-evenly items-center bg-blue">
          <div className="text-4xl text-center font-semibold pb-6 text-white">
            <h1>One step closer to</h1>
            <h1>your dream car!</h1>
          </div>
          <div className="w-100 h-auto">
            <img
              className="w-max "
              src={formImage}
              alt="side-login-car-image"
            />
          </div>
        </div>
      </div>
      <ToastContainer
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
      />
    </div>
  );
}

export default Register;
