import React from "react";
import car from "../../assets/img/car.png";

function StockVehicles(data) {
  const infoStock = data?.data.map((e) => e.id);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Primera fila con el título */}
      <div className="text-3xl font-semibold text-center pb-2">
        Stock Cars
      </div>

      {/* Segunda fila con la imagen y los datos */}
      <div className="flex items-center mt-2">
        <img className="w-20 h-10 mr-2" src={car} alt={car} />
        <div className="text-3xl">
          {!data ? "" : `Total: ${infoStock.length}`}
        </div>
      </div>

      <hr className="border-t-2 border-gray-300 w-3/4 mx-auto my-6" />
    </div>
  );
}

export default StockVehicles;


