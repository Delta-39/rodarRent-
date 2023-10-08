import { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';
import { API_BASE_URL } from '../../helpers/routes';

const EstadisticSales = () => {
  const [data, setData] = useState({ pData: [], uData: [], xLabels: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/payments`);
        const fetchedData = response.data;

        // Initialize arrays for the entire year
        const pData = Array(12).fill(0);
        const uData = Array(12).fill(0);
        const xLabels = [
          'Jan-23',
          'Feb-23',
          'Mar-23',
          'Apr-23',
          'May-23',
          'Jun-23',
          'Jul-23',
          'Aug-23',
          'Sep-23',
          'Oct-23',
          'Nov-23',
          'Dec-23',
        ];

        // Group by year and month
        const groupedData = fetchedData.reduce((acc, item) => {
          const date = new Date(item.date);
          const yearMonth = `${date.toLocaleString('en-us', {
            month: 'short',
          })}-${date.getFullYear().toString().substr(-2)}`;

          if (!acc[yearMonth]) {
            acc[yearMonth] = {
              amount: 0,
              count: 0,
            };
          }

          acc[yearMonth].amount += item.amount;
          acc[yearMonth].count++;

          return acc;
        }, {});

        // Calculate average sales
        const totalSales = Object.values(groupedData).reduce(
          (total, item) => total + item.amount,
          0,
        );
        const averageSales = Math.round(
          totalSales / Object.keys(groupedData).length / 1000,
        );

        // Set forecasted sales (pData) based on average sales and specified percentages
        pData.fill(Math.round(averageSales * 0.95), 0, 3); // first quarter is 5% less than average
        pData.fill(Math.round(averageSales * 1.01), 3, 6); // second quarter is 1% more than average
        pData.fill(Math.round(averageSales * 1.1), 6, 9); // third quarter is 10% more than average
        pData.fill(Math.round(averageSales * 1.2), 9, 12); // fourth quarter is 20% more than average

        // Match grouped data with xLabels
        xLabels.forEach((label, index) => {
          if (groupedData[label]) {
            uData[index] = Math.round(groupedData[label].amount / 1000);
          }
        });

        setData({ pData, uData, xLabels });
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const chartContainer = document.getElementById('barChart');
    const myChart = echarts.init(chartContainer);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['Expected', 'Obtained'],
        top: 10,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: data.xLabels,
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            interval: 0,
            rotate: 90,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: '{value} K',
          },
        },
      ],
      series: [
        {
          name: 'Expected',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          data: data.pData,
        },
        {
          name: 'Obtained',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          data: data.uData,
          itemStyle: {
            color: 'green',
          },
        },
      ],
    };

    myChart.setOption(option);

    const resizeHandler = () => {
      myChart.resize();
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      myChart.dispose();
    };
  }, [data.pData, data.uData, data.xLabels]);

  return (
    <div
      className="text-center text-2xl font-semibold"
      style={{ width: '100%', height: '90%' }}
    >
      Rental Registration
      <div id="barChart" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default EstadisticSales;
