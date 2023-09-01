import { Route, Routes, useLocation } from 'react-router-dom'
import routesHelper from './helpers/routes';
import Home from './views/Home/Home'
import Nav from './components/Nav/Nav';
import Landing from './views/Landing/Landing';
import Login from './views/Login/login';
import Register from './views/Register/Register'
import {useState} from 'react'

function App() {

const [darkMode,setDarkmode] = useState(true)

const toggleDarkMode = () =>{
  const element = document.documentElement
  setDarkmode(!darkMode)
  if (darkMode) {
    element.classList.add('dark')
  } else {
    element.classList.remove('dark')
  }
}

const location = useLocation()
const renderNav = location.pathname === '/register' || location.pathname === '/login'

  return (
    <div>
      {renderNav ? null : <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> }
      <Routes>
        <Route path={routesHelper.cars} element={<Home />} />
        <Route path={routesHelper.landing} element={<Landing />} />
        <Route path={routesHelper.login} element={<Login />} />
        <Route path={routesHelper.register} element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
