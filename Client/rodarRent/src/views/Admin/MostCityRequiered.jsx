import React, { useEffect } from "react";
import * as echarts from "echarts";
import { API_BASE_URL } from "../../helpers/routes";
import { useQuery } from "react-query";

const MostCityRequiered = () => {

  const locationRequired = useQuery(["locationRequired"], () =>
    fetch(`${API_BASE_URL}/location/mostRequired`).then((res) => res.json())
  );

  const colorCity = ["red", "blue", "yellow", "green"];

  const data = locationRequired?.data?.map((e, index) => ({
    name: e.alias,
    value: e.count,
    itemStyle: {
      color: colorCity[index % colorCity.length],
    },
  }));

  useEffect(() => {
    const chartContainer = document.getElementById("pieChart");
    const myChart = echarts.init(chartContainer);

    const option = {
      title: {
        text: "Most Requested Locations",
        left: "center",
        top: 20,
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        orient: "horizontal",
        left: 10,
        top: 50,
        data: data?.map((item) => item.name),
      },
      series: [
        {
          name: "Locations",
          type: "pie",
          radius: ["20%", "40%"],
          center: ["50%", "60%"],
          data: data,
          emphasis: {
            scale: true,
            scaleSize: 7,
            scaleRipple: true,
          },
          label: {
            show: true,
            position: "outside",
            formatter: "{b}: {d}%",
          },
        },
      ],
    };

    myChart.setOption(option);

    // Manejo de eventos de redimensionamiento
    const resizeHandler = () => {
      myChart.resize();
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      myChart.dispose();
    };
  }, [data]);

  return (
    <div className="w-full h-full">
      <div id="pieChart" className="w-full h-80"></div>
    </div>
  );
};

export default MostCityRequiered;
