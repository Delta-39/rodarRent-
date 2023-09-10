import { Route, Routes } from 'react-router-dom'
import routesHelper from './helpers/routes';
import Home from './views/Home/Home'
import Nav from './components/Nav/Nav';
import Landing from './views/Landing/Landing';
import Login from './views/Login/login';
import Register from './views/Register/Register';
import Detail from './views/Detail/Detail'
import { useState } from 'react'
import Booking from './views/Booking/Booking';
import Contact from './views/Contact/Contact'
import AboutUs from './views/AboutUs/AboutUs'
import CustomerList from './components/CustomerList/CustomerList';
import CustomerDetail from './components/CustomerDetail/CustomerDetail';
import BookingList from './components/BookingList/BookingList';
import Admin from './views/Admin/Admin';
import EditCustomer from './components/EditCustomer/EditCustomer';


function App() {
  const [darkMode, setDarkmode] = useState(true)

  const toggleDarkMode = () => {
    const element = document.documentElement
    setDarkmode(!darkMode)
    if (darkMode) {
      element.classList.add('dark')
    } else {
      element.classList.remove('dark')
    }
  }

  return (
    <div>
      <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path={routesHelper.cars} element={<Home />} />
        <Route path={routesHelper.landing} element={<Landing />} />
        <Route path={routesHelper.login} element={<Login />} />
        <Route path={routesHelper.register} element={<Register />} />
        <Route path={routesHelper.detail} element={<Detail />} />
        <Route path={routesHelper.booking} element={<Booking />} />
        <Route path={routesHelper.aboutUs} element={<AboutUs />} />
        <Route path={routesHelper.contact} element={<Contact />} />
        <Route path={routesHelper.allCustomers} element = {<CustomerList/>}/>
        <Route path={routesHelper.dashboardCustomer} element = {<CustomerDetail/>}/>
        <Route path={routesHelper.allBookings} element = {<BookingList/>}/>
        <Route path={routesHelper.admin} element={<Admin/>} />
        <Route path={routesHelper.editInfo} element={<EditCustomer/>} />
      </Routes>
    </div>
  );
}

export default App;