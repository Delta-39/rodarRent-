import { Route, Routes } from "react-router-dom";
import routesHelper from "./helpers/routes";
import Home from "./views/Home/Home";
import Nav from "./components/Nav/Nav";
import Landing from "./views/Landing/Landing";
import Login from "./views/Login/login";
import Register from "./views/Register/Register";
import ReviewForm from "./components/ReviewForm/ReviewForm";
import Detail from "./views/Detail/Detail";
import { useState } from "react";
import Booking from "./views/Booking/Booking";
import Contact from "./views/Contact/Contact";
import AboutUs from "./views/AboutUs/AboutUs";
import CustomerList from "./components/CustomerList/CustomerList";
import CustomerDetail from "./components/CustomerDetail/CustomerDetail";
import BookingList from "./components/BookingList/BookingList";
import Admin from "./views/Admin/Admin";
import GoogleAuthAux from "./views/googleAuthAux/GoogleAuthAux";
import Dashboard from "./views/Admin/Dashboard";
import AdminClients from "./views/Admin/AdminClients";
import AdminVehicles from "./views/Admin/AdminVehicles";
import EditPasswordCustomer from "./components/EditCustomer/EditPasswordCustomer";
import Modal from 'react-modal';
import AdminRoute from "./helpers/AdminRoute";

function App() {
  const [darkMode, setDarkmode] = useState(true);
  Modal.setAppElement('#root')
  const toggleDarkMode = () => {
    const element = document.documentElement;
    setDarkmode(!darkMode);
    if (darkMode) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  };

  return (
    <div>
      <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path={routesHelper.cars} element={<Home />} />
        <Route path={routesHelper.landing} element={<Landing />} />
        <Route path={routesHelper.login} element={<Login />} />
        <Route path={routesHelper.register} element={<Register />} />
        <Route path={routesHelper.review} element={<ReviewForm />} />
        <Route path={routesHelper.detail} element={<Detail />} />
        <Route path={routesHelper.booking} element={<Booking />} />
        <Route path={routesHelper.aboutUs} element={<AboutUs />} />
        <Route path={routesHelper.contact} element={<Contact />} />
        <Route path={routesHelper.allCustomers} element={<CustomerList />} />
        <Route path={routesHelper.dashboardCustomer}element={<CustomerDetail />} />
        <Route path={routesHelper.allBookings} element={<BookingList />} />
        <Route path={routesHelper.googleAuthAux} element={<GoogleAuthAux />} />
        <Route path={routesHelper.editPasswordCustomer} element={<EditPasswordCustomer/>} />
        {/* <Route path={routesHelper.admin} element={<AdminRoute />}> */}
        <Route path={routesHelper.admin} element={<AdminRoute><Admin/></AdminRoute>}>
          <Route index element={<Dashboard />} />
          <Route path={routesHelper.admin} element={<Dashboard />} />
          <Route path={routesHelper.adminClients} element={<AdminClients />} />
          <Route path={routesHelper.adminVehicles} element={<AdminVehicles />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
