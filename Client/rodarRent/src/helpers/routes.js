const routesHelper = {
  baseFrontUrl: 'http://127.0.0.1:5173',
  baseBackUrl: 'https://rodarrent-main-server.onrender.com',
  landing: '/',
  cars: '/cars',
  login: '/login',
  authGoogle: '/auth/google',
  register: '/register',
  registerGoogle: '/google',
  aboutUs: '/aboutUs',
  contact: '/contact',
  dashboardCustomer: '/customer/:id',
  allCustomers: '/allCustomers',
  allBookings: '/allBookings',
  detail: '/cars/:id',
  booking: '/booking',
  admin: '/admin',
  googleAuthAux: '/googleAuthAux',
  editInfo: '/edit-customer/:id',
  bookingByIdCustomer: '/myBookings',
};

export const API_BASE_URL = 'https://rodarrent-main-server.onrender.com';

export const getCustomerDetailsUrl = (customerId) =>
  `${API_BASE_URL}/customers/${customerId}`;
export const getBookingsByIdCustomerUrl = (customerId) =>
  `${API_BASE_URL}/booking/filter?CustomerId=${customerId}`;
export const updateCustomerInfoUrl = () => `${API_BASE_URL}/customers`;
export const updatePasswordUrl = () => `${API_BASE_URL}/customers/updatePassword`;
export const createReservationUrl = () => `${API_BASE_URL}/bookings`;
export const paymentUrl = () => `${API_BASE_URL}/createorder`;
export default routesHelper;
