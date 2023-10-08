import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react'; // Import useState
import { API_BASE_URL } from '../../helpers/routes';
import axios from 'axios';

export default function MostRequiredBrands() {
  const [data, setData] = useState([]); // Initialize state to store data

  useEffect(() => {
    const brandRequired = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/booking/mostRequiredBrands`,
        );
        const infoBrand = response.data;

        // Map the data and set it in state
        const mappedData = infoBrand.map((e) => ({
          label: e.model,
          value: e.count,
        }));
        setData(mappedData); // Update the state with the mapped data
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    brandRequired();
  }, []);

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mt-4">Most Required Brands</h2>
      <div className="mt-4">
        <PieChart
          series={[
            {
              data: data,
              innerRadius: 0,
              outerRadius: 150,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -90,
              endAngle: 90,
              cx: 180,
              cy: 148,
            },
          ]}
          height={180}
          width={480}
        />
      </div>
    </div>
  );
}
