/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import routesHelper from "../../../helpers/routes";
import { logOut } from "../../../redux/actions";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiGridAlt, BiCar, BiUser, BiLogOut } from "react-icons/bi";

const AdminNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut(navigate));
  };

  const location = useLocation();

  return (
    <div className="min-h-[calc(100vh-112px)] dark:bg-slate-900">
      <div className="h-[calc(100vh-112px)] flex flex-col justify-evenly w-64 border-r-2 border-gray-200 dark:bg-slate-900 dark:text-gray-300 ">
        <div className="flex flex-col h-56 justify-evenly">
          <Link to={routesHelper.admin}>
            <button
              className={`w-full flex flex-col h-16 text-lg justify-evenly items-center ${
                location.pathname === routesHelper.admin
                  ? "bg-gray-200 dark:bg-slate-950"
                  : "bg-white dark:bg-slate-900"
              } transition duration-400 hover:bg-gray-200`}
            >
              <BiGridAlt />
              Dashboard
            </button>
          </Link>
          <Link to={routesHelper.adminClients}>
            <button
              className={`w-full flex flex-col h-16 text-lg justify-evenly items-center ${
                location.pathname === routesHelper.adminClients
                  ? "bg-gray-200 dark:bg-slate-950"
                  : "bg-white dark:bg-slate-900"
              } transition duration-400 hover:bg-gray-200`}
            >
              <BiUser />
              Customers
            </button>
          </Link>
          <Link to={routesHelper.adminVehicles}>
            <button
              className={`w-full flex flex-col h-16 text-lg justify-evenly items-center ${
                location.pathname === routesHelper.adminVehicles
                  ? "bg-gray-200 dark:bg-slate-950"
                  : "bg-white dark:bg-slate-900"
              } transition duration-400 hover:bg-gray-200`}
            >
              <BiCar />
              Vehicles
            </button>
          </Link>
        </div>
        <button
          className="w-full h-16 flex flex-col justify-evenly items-center text-lg bg-white dark:bg-slate-900 transition duration-400 hover:bg-rose-200 "
          onClick={handleLogout}
        >
          <BiLogOut />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default AdminNav;
