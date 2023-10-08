const routesHelper = {
  baseFrontUrl: 'http://127.0.0.1:5173', //'https://rodarrent.vercel.app',
  baseBackUrl: 'http://localhost:3001', //'https://rodarrent-main-server.onrender.com',
  landing: '/',
  cars: '/cars',
  login: '/login',
  authGoogle: '/auth/google',
  register: '/register',
  review: '/review',
  registerGoogle: '/google',
  aboutUs: '/aboutUs',
  contact: '/contact',
  dashboardCustomer: '/customer/:id',
  allCustomers: '/allCustomers',
  allBookings: '/allBookings',
  detail: '/cars/:id',
  booking: '/booking',
  admin: '/admin',
  adminClients:'/admin/clients',
  adminVehicles:'/admin/vehicles',
  googleAuthAux: '/googleAuthAux',
  editInfo: '/edit-customer/:id',
  bookingByIdCustomer: '/myBookings',
  editPasswordCustomer: '/editPasswordCustomer/:id',
  forgotpasswordUrl: '/customers/forgotpassword',
  summary:"/booking/sumary",
  locationRequired:"/location/mostRequired",
  mostRequiredBrands:"/booking/mostRequiredBrands"

};

export const API_BASE_URL = routesHelper.baseBackUrl;

export const getCustomerDetailsUrl = (customerId) =>
  `${API_BASE_URL}/customers/${customerId}`;
export const getBookingsByIdCustomerUrl = (customerId) =>
  `${API_BASE_URL}/booking/filter?CustomerId=${customerId}`;
export const updateCustomerInfoUrl = () => `${API_BASE_URL}/customers`;
export const updatePasswordUrl = () => `${API_BASE_URL}/customers/updatePassword`;
export const createReservationUrl = () => `${API_BASE_URL}/bookings`;
export const paymentUrl = () => `${API_BASE_URL}/createorder`;
export const updateBookingUrl = (bookingId) => `${API_BASE_URL}/bookings/${bookingId}`;
export const cancelBookingUrl = (bookingId) => `${API_BASE_URL}/bookings/cancel/${bookingId}`;
export const getBookingById = (bookingId) => `${API_BASE_URL}/bookings/${bookingId}`;
export const getAllLocations = () => `${API_BASE_URL}/locations`;
export const getAllVehicles = () => `${API_BASE_URL}/vehicles`;
export const getAllCustomersUrl = () => `${API_BASE_URL}/customers`;
export const getVehicleAvailabilityById = () => `${API_BASE_URL}/available/${VehicleId}/${startDate}/${finishDate}`;
export const forgotpasswordUrl = `${API_BASE_URL}/customers/forgotpassword`;
export const bookingSummary = () => `${API_BASE_URL}/booking/summary`;
export const locationRequired = ()=> `${API_BASE_URL}/location/mostRequired`
export const mostRequiredBrands = ()=> `${API_BASE_URL}/booking/mostRequiredBrands`

export default routesHelper;
