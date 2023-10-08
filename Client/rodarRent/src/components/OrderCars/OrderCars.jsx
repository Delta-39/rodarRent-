/* eslint-disable react/prop-types */

const OrderCards = ({ filterObject, onChangeOrder }) => {
  return (
    <div className="w-full flex mb-4 font-poppins transition duration-200 dark:bg-slate-900 dark:text-gray-100">
      <div className="w-full md:w-2/3 lg:w-2/5 flex ml-auto mr-10">
        <p className="font-semibold my-auto text-gray-500 ml-2">Order by</p>
        <select
          className="border rounded p-2 dark:bg-slate-950 mb-2 ml-auto mr-4 w-3/5 h-10"
          name="orderBy"
          value={filterObject.orderBy}
          onChange={(e) => onChangeOrder(e.target.value, "DESC")}
        >
          <option value="pricePerDay">Price</option>
          <option value="passengers">Passengers</option>
          <option value="brand">Brand</option>
        </select>
        <div className="flex gap-3 items-center">
          <span
            className={`font-semibold ${
              filterObject.direction === "ASC"
                ? "text-cyan-600"
                : "hover:cursor-pointer opacity-50"
            }`}
            onClick={() => onChangeOrder(filterObject.orderBy, "ASC")}
          >
            A↑
          </span>
          <span
            className={`font-semibold ${
              filterObject.direction === "DESC"
                ? "text-cyan-600"
                : "hover:cursor-pointer opacity-50"
            }`}
            onClick={() => onChangeOrder(filterObject.orderBy, "DESC")}
          >
            D↓
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderCards;
