import { useQuery } from "react-query";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { API_BASE_URL } from "../../helpers/routes";

export const InfoAmount = () => {
  const [income, setIncome] = React.useState('today');
  const [ytdIncome, setYtdIncome] = React.useState(null);
  const [mtdIncome, setMtdIncome] = React.useState(null);
  const [todayIncome, setTodayIncome] = React.useState(null);

  const handleChange = (event) => {
    setIncome(event.target.value);
  };

  const calculateIncomes = (bookings) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const ytd = bookings.reduce((total, booking) => {
      const bookingYear = new Date(booking.startDate).getFullYear();
      if (bookingYear === currentYear) {
        return total + booking.amount;
      }
      return total;
    }, 0);

    const mtd = bookings.reduce((total, booking) => {
      const bookingYear = new Date(booking.startDate).getFullYear();
      const bookingMonth = new Date(booking.startDate).getMonth() + 1;
      if (bookingYear === currentYear && bookingMonth === currentMonth) {
        return total + booking.amount;
      }
      return total;
    }, 0);

    const today = bookings.reduce((total, booking) => {
      const bookingDate = new Date(booking.startDate);
      const bookingYear = bookingDate.getFullYear();
      const bookingMonth = bookingDate.getMonth() + 1;
      const bookingDay = bookingDate.getDate();
      if (
        bookingYear === currentYear &&
        bookingMonth === currentMonth &&
        bookingDay === currentDate.getDate()
      ) {
        return total + booking.amount;
      }
      return total;
    }, 0);

    setYtdIncome(ytd);
    setMtdIncome(mtd);
    setTodayIncome(today);
  };

  function fetchBookings() {
    return fetch(`${API_BASE_URL}/booking/filter`)
    
      .then((res) => res.json())
      .then((data) => {
        calculateIncomes(data);
        return data;
      });
  }

  const queryBookings = useQuery(["bookings"], fetchBookings);

  React.useEffect(() => {
    if (!queryBookings.isLoading) {
      calculateIncomes(queryBookings.data);
    }
  }, [queryBookings.data]);

  return (
    <div>
      <div className="text-center text-2xl font-semibold">Profit Record</div>

      <div className="flex w-full justify-around pt-5 dark:text-gray-100">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel className="dark:text-gray-100" id="demo-simple-select-label">Income</InputLabel>
            <Select
              className="dark:text-gray-100"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={income}
              label="Income"
              onChange={handleChange}
            >
              <MenuItem value="ytd">YTD</MenuItem>
              <MenuItem value="mtd">MTD</MenuItem>
              <MenuItem value="today">Today</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <div className="text-center mt-10">
        {queryBookings.isLoading ? ( ""
        ) : (
          <div className="text-5xl">${income === "ytd" ? ytdIncome : income === "mtd" ? mtdIncome : todayIncome}</div>
        )}
        <hr className="border-t-2 border-gray-300 w-3/4 mx-auto my-6" />
      </div>
    </div>
  );
};
