import { useState } from "react";
import validate from "./validateLogin";
import formImage from "../../assets/img/loginRegister/login.png";
import { Link } from "react-router-dom";
import routesHelper from "../../helpers/routes";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../redux/actions";
import ForgotPassword from "../../components/ForgotPassword/ForgotPassword";
import "react-toastify/dist/ReactToastify.css";
import { BiErrorCircle } from "react-icons/bi";

const Login = () => {
  const [disabledSubmit, setDisabledSubmit] = useState(true);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showError, setShowError] = useState({
    email: false,
    password: false,
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    const validationErrors = validate({ ...loginData, [property]: value });
    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== ""
    );
    setDisabledSubmit(hasErrors);
    setLoginData({ ...loginData, [property]: value });
    setErrors(validationErrors);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(logIn(loginData, navigate));
  };

  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);

  const openForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(true);
  };

  const closeForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(false);
  };

  return (
    <div className="w-full min-h-[calc(100vh-112px)] bg-white dark:bg-slate-900 transition-colors duration-300 dark:text-gray-100 flex items-center justify-center">
      <div className='xl:flex-row xl:w-2/3 xl:flex lg:w-2/3 lg:flex-row lg:flex md:flex-col md:w-full sm:w-full sm:flex sm:justify-center' >
        <div className="sm:drop-shadow-md bg-white lg:w-1/2 lg:rounded-l-xl  dark:bg-slate-900">
          <form className="px-8 pt-14 flex flex-col flex-wrap w-full rounded-xl">
            <h1 className="font-poppins font-medium  text-4xl">Welcome back!</h1>
            <h6 className="font-poppins pb-6 text-gray">
              Please enter your details
            </h6>
            <hr className="ml-8 mr-8 text-gray" />
            <label
              className="font-poppins flex m-1 justify-start"
              htmlFor="email"
            >
              E-mail
            </label>
            <div className="w-full flex justify-between items-center">
              <input
                className="font-poppins w-72 md:w-5/6 text-sm flex justify-start items-center p-2 m-1 rounded-lg drop-shadow-md border border-gray dark:bg-slate-950"
                type="text"
                name="email"
                placeholder="Type your e-mail"
                value={loginData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div
                  className="relative"
                  onMouseEnter={() =>
                    setShowError({ ...showError, email: true })
                  }
                  onMouseLeave={() =>
                    setShowError({ ...showError, email: false })
                  }
                >
                  <BiErrorCircle className="text-red text-xl cursor-pointer " />
                  {showError.email && (
                    <div className=" bg-white w-32 md:w-1/6 border font-semibold border-gray-300 text-red absolute rounded-lg -bottom-14 transform -translate-x-1/2 z-20 p-1 dark:bg-slate-900 ">
                      {errors.email}
                    </div>
                  )}
                </div>
              )}
            </div>
            <label
              className="font-poppins flex m-1 justify-start"
              htmlFor="password"
            >
              Password
            </label>
            <div className="w-full flex justify-between items-center">
              <input
                className="font-poppins w-72 text-sm md:w-5/6 flex justify-start items-center p-2 m-1 rounded-lg drop-shadow-md border border-gray dark:bg-slate-950"
                type="password"
                name="password"
                placeholder="Type your password"
                value={loginData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div
                  className="relative"
                  onMouseEnter={() =>
                    setShowError({ ...showError, password: true })
                  }
                  onMouseLeave={() =>
                    setShowError({ ...showError, password: false })
                  }
                >
                  <BiErrorCircle className="text-red text-xl cursor-pointer " />
                  {showError.password && (
                    <div className=" bg-white w-32 md:w-1/6 border font-semibold border-gray-300 text-red absolute rounded-lg -bottom-14 transform -translate-x-1/2 z-20 p-1 dark:bg-slate-900">
                      {errors.password}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col mt-4 mb-4">
              <button
                className={
                  disabledSubmit
                    ? "font-poppins bg-blue cursor-not-allowed rounded-lg p-2 m-2 text-white"
                    : "font-poppins bg-blue cursor-pointer rounded-lg p-2 m-2 text-white"
                }
                onClick={handleLogin}
                disabled={disabledSubmit}
              >
                Sign In
              </button>
              <a
                className="font-poppins bg-white cursor-pointer rounded-lg p-1 m-2 flex flex-row justify-center items-center drop-shadow-md border border-gray dark:bg-slate-950  transition-shadow duration-300 ease-in-out hover:drop-shadow-none "
                href={routesHelper.baseBackUrl + routesHelper.authGoogle}
              >
                <img
                  className="relative w-6 m-1"
                  src="https://res.cloudinary.com/daiztctac/image/upload/v1694553181/pogqgaencfemfipzu7xo.png" //"../../src/assets/img/google_logo.png"
                  alt="Google img"
                ></img>
                Sign in with google
              </a>
            </div>
            <hr className="ml-8 mr-8 text-gray" />
            <div className="flex flex-col justify-center items-center m-5">
              <div className="flex justify-center items-center m-4">
                <p className="font-poppins text-gray text-xs m-2">
                  Don't have an account?
                </p>
                <p className="text-sm underline decoration-solid font-poppins">
                  <Link to={routesHelper.register}>Sign up for free</Link>
                </p>
              </div>
              <a
                className="font-poppins text-gray text-xs"
                href="#"
                onClick={openForgotPasswordModal}
              >
                Forgot your password?
              </a>
            </div>
          </form>
        </div>
        <div className=" sm:hidden xl:pb-10 lg:flex lg:flex-col lg:w-1/2 lg:rounded-xl drop-shadow-md bg-blue  pt-14">
          <div className="text-4xl text-center font-semibold pb-6 text-white" >
            <h1>One step closer to</h1>
            <h1>your dream car!</h1>
          </div>
          <div className="w-100 md:w-full h-auto" >
            <img className="w-max " src={formImage} alt="side-login-car-image" />
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
      {isForgotPasswordModalOpen && (
        <ForgotPassword onClose={closeForgotPasswordModal} />
      )}
    </div>
  );
};
export default Login;
