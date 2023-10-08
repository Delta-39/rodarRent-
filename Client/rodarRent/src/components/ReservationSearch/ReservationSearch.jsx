// Hooks & tools
import routesHelper from "../../helpers/routes";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// Actions
import { setFilters } from "../../redux/actions";

const ReservationSearch = () => {
  const dispatch = useDispatch();
  const filterObject = useSelector((state) => state.veh.filterObject);
  const userData = useSelector((state) => state.auth.customer);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios
      .get(`${routesHelper.baseBackUrl}/locations`)
      .then(({ data }) => {
        setLocations(data);
      })
      .catch(() => {
        axios
          .get(`${routesHelper.baseBackUrl}/locations`)
          .then(({ data }) => {
            setLocations(data);
          })
          .catch((error) => {
            window.alert(
              `An error ocurred retrieving locations from server: ${error.message}`
            );
          });
      });
  }, []);

  const [search, setSearch] = useState({
    startDate: filterObject.startDate ? filterObject.startDate : "",
    finishDate: filterObject.finishDate ? filterObject.finishDate : "",
    pickUpLocationId: filterObject.pickUpLocationId
      ? filterObject.pickUpLocationId
      : "",
    returnLocationId: filterObject.returnLocationId
      ? filterObject.returnLocationId
      : "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    let value = event.target.value;
    if (
      property === "startDate" &&
      (new Date(value) <= new Date() ||
        new Date(value) >= new Date(search.finishDate))
    ) {
      value = "";
    }
    if (
      property === "finishDate" &&
      new Date(value) <= new Date(search.startDate)
    ) {
      value = "";
    }
    setSearch({ ...search, [property]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      setFilters({
        ...filterObject,
        startDate: search.startDate,
        finishDate: search.finishDate,
        pickUpLocationId: search.pickUpLocationId,
        returnLocationId: search.returnLocationId,
        offset: 0,
      })
    );
  };

  const disableButton =
    !search.startDate ||
    !search.finishDate ||
    !search.pickUpLocationId ||
    !search.returnLocationId ||
    new Date(search.finishDate) <= new Date(search.startDate);

  // * Variable para verificar si el usuario es el admin
  const isAdmin = userData?.UserId === 1;

  return (
    <div className="min-h-24 w-full p-3 flex flex-wrap-reverse 2xl:flex-nowrap xl:flex-nowrap md:flex-wrap lg:flex-wrap items-center justify-between font-poppins dark:bg-slate-900 dark:text-gray-100 transition duration-300">
      <div className="flex flex-wrap h-full w-full lg:w-3/4 ml-2 lg:ml-3 my-2 lg:mr-auto md:justify-start">
        <form
          className="flex w-full h-full items-center flex-wrap lg:flex-nowrap md:justify-start"
          action=""
        >
          <div className="w-full md:w-2/5 lg:w-[300px] flex justify-center sm:justify-around mb-2">
            <div className="min-w-[140px] w-[40%] sm:min-w-[280px] md:min-w-[140px] md:w-[140px] flex flex-col border bg-white drop-shadow-md rounded-lg px-2 py-2.5 h-full mr-2 dark:bg-slate-950">
              <label className="text-xs mb-2">Pick up Date</label>
              <input
                onChange={handleChange}
                className="text-xs border rounded dark:bg-slate-950"
                type="date"
                name="startDate"
                value={search.startDate || ""}
                id=""
              />
            </div>
            <div className="min-w-[140px] w-[40%] sm:min-w-[280px] md:min-w-[140px] md:w-[140px]  flex flex-col border bg-white drop-shadow-md rounded-lg px-2 py-2.5 h-full mr-2 dark:bg-slate-950">
              <label className=" text-xs mb-2">Return Date</label>
              <input
                onChange={handleChange}
                className="text-xs border rounded dark:bg-slate-950"
                type="date"
                name="finishDate"
                value={search.finishDate || ""}
                id=""
              />
            </div>
          </div>
          <div className="w-full md:w-[40%] lg:min-w-[450px] flex flex-wrap md:flex-nowrap gap-2 justify-around md:justify-start md:ml-2 mb-2">
            <div className="w-[80%] min-w-[280px] sm:max-w-[280px] md:min-w-[190px] md:w-2/5 lg:min-w-[210px] flex flex-col border bg-white drop-shadow-md rounded-lg p-2 h-full mr-2 dark:bg-slate-950">
              <label className=" text-xs mb-2 mt-1">Pick Up Location</label>
              <select
                className="text-xs border rounded dark:bg-slate-950"
                name="pickUpLocationId"
                value={search.pickUpLocationId || ""}
                onChange={handleChange}
              >
                <option value="">Choose pick up location</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {`${loc.alias} - ${loc.city}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[80%] min-w-[280px] sm:max-w-[280px]  md:min-w-[190px] md:w-2/5 lg:min-w-[210px] flex flex-col border bg-white drop-shadow-md rounded-lg p-2 h-full mr-2 dark:bg-slate-950">
              <label className="text-xs mb-2 mt-1">Return Location</label>
              <select
                className="text-xs border rounded dark:bg-slate-950"
                name="returnLocationId"
                value={search.returnLocationId || ""}
                onChange={handleChange}
              >
                <option value="">Choose a return location</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {`${loc.alias} - ${loc.city}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="h-full w-[150px] flex justify-start mt-4 lg:mt-0">
            <button
              onClick={handleSubmit}
              disabled={disableButton}
              className="bg-blue text-white h-12 px-10 rounded-lg text-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {isLoggedIn ? (
        <div className="flex w-full md:w-1/4 justify-center my-3">
          <Link
            className="text-md text-white bg-blue font-semibold py-3 px-10 rounded-lg"
            to={isAdmin ? "/admin" : `/customer/${userData.id}`}
          >
            {isAdmin ? "Admin" : "My profile"}
          </Link>
        </div>
      ) : (
        <div className="flex w-full lg:w-[20%] my-3 lg:ml-auto justify-around sm:justify-end sm:gap-x-4 mr-2 lg:gap-x-6 lg:mr-4">
          <Link
            className="text-md py-3 px-7 rounded-lg transition duration-300 hover:bg-black hover:text-white"
            to={routesHelper.register}
          >
            Register
          </Link>
          <Link
            className="text-md text-blue whitespace-nowrap font-semibold py-3 px-9 rounded-lg transition duration-300 hover:bg-blue hover:text-white"
            to={routesHelper.login}
          >
            Log in
          </Link>
        </div>
      )}
    </div>
  );
};

export default ReservationSearch;
