/* eslint-disable react-hooks/exhaustive-deps */

// Hooks & tools
import { useState, useEffect } from "react";
import { getAvailability, setFilters } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
// Components
import CarCard from "../CarCard/CarCard";
import CarFilter from "../CarFilter/CarFilter";
import Pagination from "../Pagination/Pagination";
import Loader from "../Loader/Loader";

const CarList = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const vehicles = useSelector((state) => state.veh.vehicles);
  const filterObject = useSelector((state) => state.veh.filterObject);

  useEffect(() => {
    loading || setLoading(true); // revisar lo de loading || condicional si no es true
    dispatch(getAvailability(filterObject)).then(() => {
      setLoading(false);
    });
  }, [filterObject]);

  const onPageChange = (pageNumber) => {
    dispatch(
      setFilters({
        ...filterObject,
        offset: (pageNumber - 1) * filterObject.limit,
      })
    );
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex w-full justify-between dark:bg-slate-900 dark:text-gray-100 transition duration-300 ">
          <div
            className="w-1/4 p-4 dark:bg-slate-900"
            style={{ height: "827px" }}
          >
            <h1 className="text-xl font-bold mb-4">Filter By</h1>
            <CarFilter />
          </div>
          <div className=" w-3/4 flex flex-col p-7">
            <div className="w-full flex flex-wrap justify-between gap-y-4">
              {vehicles.results.map((car) => (
                <CarCard car={car} key={car.id} />
              ))}
            </div>
            <div className="w-full mt-4">
              <Pagination vehicles={vehicles} onPageChange={onPageChange} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarList;
