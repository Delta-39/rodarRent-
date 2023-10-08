import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';
import { API_BASE_URL } from '../../helpers/routes';

export const FutureSales = () => {
  const [data, setData] = useState({ pData: [], uData: [], xLabels: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/booking/future`);
        const fetchedData = response.data;
        console.log(fetchedData);

        // Extract data from the fetchedData and update state
        const xLabels = fetchedData.map((item) => item.month);
        const pData = fetchedData.map((item) => item.expected);
        const uData = fetchedData.map((item) => item.count);

        // Calculate average sales
        const futureSales = Object.values(fetchedData).reduce(
          (total, item) => total + Number(item.count),
          0,
        );
        console.log(futureSales);
        const averageFutureSales = Math.ceil(
          futureSales / Object.keys(fetchedData).length,
        );
        console.log(averageFutureSales);

        // Set forecasted sales (pData) based on average sales and specified percentages
        pData.fill(Math.ceil(averageFutureSales * 0.95), 0, 3); // first quarter is 5% less than average
        pData.fill(Math.ceil(averageFutureSales * 1.01), 3, 5); // second quarter is 1% more than average
        pData.fill(Math.ceil(averageFutureSales * 1.1), 5, 7); // third quarter is 10% more than average

        setData({ pData, uData, xLabels });
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const chartContainer = document.getElementById('futureSalesChart');
    const futureSalesChart = echarts.init(chartContainer);

    const options = {
      grid: {
        top: 50,
        right: 10,
        bottom: 20,
      },
      title: {
        text: 'Future Sales',
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
        left: 'center',
        top: '5%',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Expected', 'Obtained'],
        top: '15%',
      },
      xAxis: {
        type: 'category',
        data: data.xLabels,
      },
      yAxis: {
        type: 'value',
        max: 8,
        min: 1,
      },
      series: [
        {
          name: 'Expected',
          type: 'line',
          data: data.pData,
        },
        {
          name: 'Obtained',
          type: 'line',
          data: data.uData,
          itemStyle: {
            color: 'green',
          },
        },
      ],
    };

    futureSalesChart.setOption(options);

    // Listen for window resize events to adjust the chart size
    window.addEventListener('resize', () => {
      futureSalesChart.resize();
    });

    return () => {
      futureSalesChart.dispose();
    };
  }, [data.pData, data.uData, data.xLabels]);

  return (
    <div id="futureSalesChart" style={{ width: '100%', height: '300px' }}></div>
  );
};
