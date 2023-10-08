import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TableDashboard from "./TableDashboard";
import { useQuery } from "react-query";
import Loader from "../../components/Loader/Loader";
import { GrafInfo } from "./GrafInfo";
import { InfoAmount } from "./InfoAmount";
import { FilterStatusCar } from "./FilterStatusCar";
import EstadiscticSales from "./EstadisticSales";
import { FutureSales } from "./FutureSales";
import MostRequieredBrands from "./MostRequiredBrands";
import MostCityRequiered from "./MostCityRequiered";
import StockVehicles from "./StockVehicles";
import DetailStockCar from "./DetailStockCar";

const Dashboard = () => {
  const queryVehicles = useQuery(["vehicles"], () =>
    fetch(`${API_BASE_URL}/vehicles`).then((res) => res.json())
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className=" w-[calc(100vw-256px)] grid grid-cols-6 gap-2 dark:bg-slate-900 dark:text-gray-100">
        <div className="border-2 rounded-2xl bg-gray-100 pl-2 m-2 h-72 col-start-1 col-span-2">
          <EstadiscticSales />
        </div>

        <div className="border-2 rounded-2xl bg-gray-100 pl-2 m-2 h-72 col-start-3 col-span-2 dark:bg-slate-950 dark:text-gray-100">
          <InfoAmount />
        </div>

        <div className="border-2 rounded-2xl bg-gray-100 pl-2 m-2 h-72 col-start-5 col-span-2">
          <GrafInfo />
        </div>

        <div className="border-2 rounded-2xl bg-gray-100 p-4 m-2 h-full col-start-1 col-span-3">
          {queryVehicles.isLoading ? (
            <Loader />
          ) : (
            <TableDashboard data={queryVehicles?.data?.results} />
          )}
        </div>

        <div className="border-2 rounded-2xl bg-gray-100 pl-2 m-2 h-full col-start-4 col-span-3">
          <FilterStatusCar />
          <hr />
          <MostRequieredBrands />
        </div>

        <div className="border-2 rounded-2xl bg-gray-100 pl-2 m-2 col-start- col-span-4">
          <FutureSales />
        </div>

        <div className="border-2 rounded-2xl bg-gray-100 pl-2 m-2 col-start-5 col-span-2">
          <MostCityRequiered />
        </div>

        <div className="border-2 rounded-2xl bg-gray-100 pl-2 m-2 col-start-1 col-span-2">
          {queryVehicles.isLoading ? (
            <Loader />
          ) : (
            <StockVehicles data={queryVehicles?.data?.results} />
          )}{" "}
        </div>

        <div className="border-2 rounded-2xl bg-gray-100 pl-2 m-2 col-start-3 col-span-4">
          {queryVehicles.isLoading ? (
            <Loader />
          ) : (
            <DetailStockCar data={queryVehicles?.data?.results} />
          )}{" "}
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default Dashboard;
