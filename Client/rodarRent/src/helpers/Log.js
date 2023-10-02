import { setLocalStorage, removeLocalStorage } from './storage';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import revalidateCustomerData from './revalidateCustomerData';
import { API_BASE_URL } from './routes';

export const successLogin = async (customerData, navigate) => {
  
  let needToOpenModal = false
  const {address, zipCode, phoneNumber,city, country} = customerData
  if (address==='n/a' || zipCode==='n/a' || phoneNumber==='n/a' || city==='n/a' || country==='n/a') {
    needToOpenModal=true
  } 
  
  const newData = await revalidateCustomerData(customerData)
  setLocalStorage('isLoggedIn', true)
  setLocalStorage('loginData', newData);
  let name = ''
  customerData.given_name? name = customerData.given_name:name = customerData.name
  toast.success('Welcome!, ' + name, { position: 'top-left' }); //Mensaje al inicio en vista de usuario
  setTimeout(() => {
    if(needToOpenModal) {
      navigate('/customer/'+ newData.id)
    } else {
    navigate('/cars');
  }}, '4000');
};

export const logOutSession = async (navigate) =>{
  setLocalStorage('isLoggedIn', false)
  removeLocalStorage('loginData')
  toast.success('Logged Out Succesfuly',{position:'top-left'})
  window.location.href = API_BASE_URL + '/logout';
  // setTimeout(()=>{
  //   navigate('/cars')
  // },'2000')
}
