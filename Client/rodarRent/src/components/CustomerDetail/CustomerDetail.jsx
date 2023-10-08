import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import DashboardActions from '../DashboardActions/DashboardActions';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import ReviewForm from '../ReviewForm/ReviewForm';
import EditCustomer from '../EditCustomer/EditCustomer';
import EditPasswordCustomer from '../EditCustomer/EditPasswordCustomer';
import EditBooking from '../EditBooking/EditBooking';
import CustomerInfo from '../CustomerInfo/CustomerInfo';
import WelcomeCustomer from '../WelcomeCustomer/WelcomeCustomer';
import { BiTrash } from 'react-icons/bi';
import {
  getCustomerDetailsUrl,
  getBookingsByIdCustomerUrl,
  getAllVehicles,
} from '../../helpers/routes';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomerDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [customerBookings, setCustomerBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isEditCustomerModalOpen, setIsEditCustomerModalOpen] = useState(false);
  const [isEditPasswordCustomerModalOpen, setIsEditPasswordCustomerModalOpen] =
    useState(false);
  const [isEditBookingModalOpen, setIsEditBookingModalOpen] = useState(false);
  const [allVehicles, setAllVehicles] = useState([]);
  const modalRefCustomer = useRef(null);
  const modalRefPasswordCustomer = useRef(null);
  const modalRefBooking = useRef(null);
  const [isWarningShown, setIsWarningShown] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(getAllVehicles());
        const vehiclesArray = response.data.results;
        setAllVehicles(vehiclesArray);
      } catch (error) {
        console.error('Error fetching vehicles', error);
      }
    };

    fetchVehicles();
  }, []);

  const sortBookingsByStartDate = (bookings) => {
    return bookings.sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return dateA - dateB;
    });
  };

  const openReviewCustomerModal = () => {
    setIsReviewModalOpen(true);
  };

  const closeReviewCustomerModal = () => {
    setIsReviewModalOpen(false);
  };

  const openEditCustomerModal = () => {
    setIsEditCustomerModalOpen(true);
  };

  const closeEditCustomerModal = () => {
    setIsEditCustomerModalOpen(false);
  };

  const openEditPasswordCustomerModal = () => {
    setIsEditPasswordCustomerModalOpen(true);
  };

  const closeEditPasswordCustomerModal = () => {
    setIsEditPasswordCustomerModalOpen(false);
  };

  const openEditBookingModal = () => {
    setIsEditBookingModalOpen(true);
  };

  const closeEditBookingModal = () => {
    setIsEditBookingModalOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (modalRefCustomer.current && e.target === modalRefCustomer.current) {
      closeEditCustomerModal();
    } else if (
      modalRefPasswordCustomer.current &&
      e.target === modalRefPasswordCustomer.current
    ) {
      closeEditPasswordCustomerModal();
    } else if (
      modalRefBooking.current &&
      e.target === modalRefBooking.current
    ) {
      closeEditBookingModal();
    }
  };

  const closeModalOnClickOutside = (e) => {
    if (
      (modalRefCustomer.current &&
        !modalRefCustomer.current.contains(e.target)) ||
      (modalRefPasswordCustomer.current &&
        !modalRefPasswordCustomer.current.contains(e.target)) ||
      (modalRefBooking.current && !modalRefBooking.current.contains(e.target))
    ) {
      closeEditCustomerModal();
      closeEditPasswordCustomerModal();
      closeEditBookingModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeModalOnClickOutside);
    return () => {
      document.removeEventListener('mousedown', closeModalOnClickOutside);
    };
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await fetch(getCustomerDetailsUrl(id));
        const data = await response.json();
        setCustomer(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error', error);
        setIsLoading(false);
      }
    };
    fetchCustomerDetails();
  }, []);

  useEffect(() => {
    if (customer) {
      const { address, zipCode, phoneNumber, city, country } = customer;
      if (
        address === 'n/a' ||
        zipCode === 'n/a' ||
        phoneNumber === 'n/a' ||
        city === 'n/a' ||
        (country === 'n/a' && !isWarningShown)
      ) {
        openEditCustomerModal();
        //toast.warning('Please complete your personal data', {
        //autoClose: 3000,
        //})
        setIsWarningShown(true);
      }
    }
  }, [id, customer]);

  useEffect(() => {
    const fetchCustomerBookings = async () => {
      try {
        if (id) {
          const response = await fetch(getBookingsByIdCustomerUrl(id));
          const data = await response.json();
          // console.log(data);
          if (Array.isArray(data)) {
            const formattedData = data.map((booking) => {
              // Parse the date strings to Date objects and set the timezone to UTC
              const startDate = new Date(booking.startDate);
              const finishDate = new Date(booking.finishDate);

              return {
                ...booking,
                formattedStartDate: startDate.toLocaleDateString('en-GB', {
                  timeZone: 'UTC', // Set the timezone to UTC
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }),
                formattedFinishDate: finishDate.toLocaleDateString('en-GB', {
                  timeZone: 'UTC', // Set the timezone to UTC
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }),
              };
            });
            // console.log(formattedData);

            const sortedBookings = sortBookingsByStartDate(formattedData);
            setCustomerBookings(sortedBookings);
          } else {
            console.error('Data is not an array:', data);
          }
        }
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchCustomerBookings();
  }, [id]);

  const handleEditBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
    openEditBookingModal();
  };

  const handleLogout = () => {
    dispatch(logOut(navigate));
  };

  if (isLoading) {
    return <Loader />;
  }

  const paginate = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(customerBookings.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const currentBookings = paginate(customerBookings);

  const toastAlert = (message, type) => {
    if (type ==="success"){
      toast.success(message);
    }
    else if (type ==="error"){
      toast.error(message);
    }
    else toast.info(message);
  }

  return (
    <div className="min-h-[calc(100vh-112px)] font-poppins transition duration-300 dark:bg-slate-900 dark:text-gray-100">
      <div className="w-full sm:h-16 rounded-t-lg p-6 flex flex-col justify-evenly ">
        <WelcomeCustomer customer={customer} onLogout={handleLogout} />
      </div>
      <div className="grid grid-cols-3 grid-row-3 h-full mt-10">
        <div className="flex justify-center col-start-1 col-end-4 sm:col-end-3 row-start-1 row-end-2 sm:row-end-3">
          <div className="w-full p-4">
            <div className="border-b-2 border-gray-300">
              <h1 className="text-2xl font-medium text-black dark:text-gray-100 font-poppins">
                Customer's Bookings
              </h1>
              {customerBookings.length === 0 ? (
                <p>No bookings found for this customer.</p>
              ) : (
                <div className="rounded-lg bg-white border border-gray-300 drop-shadow-md mt-10">
                  <table className="w-full h-max rounded-lg border-1 bg-gradient border-1 border-black">
                    <thead>
                      <tr>
                        <th>Vehicle</th>
                        <th>Start Date</th>
                        <th>Finish Date</th>
                        <th>Amount</th>
                        <th>State</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentBookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="w-1/4 h-10 px-6 py-3 bg-white rounded-md shadow">
                            {allVehicles.map(
                              (vehicle) =>
                                vehicle.id === booking.VehicleId && (
                                  <div key={vehicle.id}>
                                    <span>
                                      {vehicle.brand} - {vehicle.model}
                                    </span>
                                  </div>
                                ),
                            )}
                          </td>
                          <td className="w-1/4 h-10 px-6 py-3 bg-white rounded-md shadow">
                            {booking.formattedStartDate}
                          </td>
                          <td className="w-1/4 h-10 px-6 py-3 bg-white rounded-md shadow">
                            {booking.formattedFinishDate}
                          </td>
                          <td className="w-1/4 h-10 px-6 py-3 bg-white rounded-md shadow">
                            ${booking.amount}
                          </td>
                          <td className="w-1/4 h-10 px-6 py-3 bg-white rounded-md shadow">
                            <div className="flex items-center justify-between">
                              <span
                                className={`${
                                  booking.stateBooking === 'completed'
                                    ? 'text-green-500'
                                    : booking.stateBooking === 'confirmed'
                                    ? 'text-yellow-500'
                                    : booking.stateBooking === 'pending'
                                    ? 'text-cyan-500'
                                    : booking.stateBooking === 'canceled'
                                    ? 'text-red'
                                    : ''
                                }`}
                              >
                                {booking.stateBooking}
                              </span>
                              <div className="flex text-2xl">
                                {(booking.stateBooking === 'confirmed' ||
                                  booking.stateBooking === 'pending') && (
                                  <BiTrash
                                    onClick={() =>
                                      handleEditBooking(booking.id)
                                    }
                                    className="ml-2 cursor-pointer hover:scale-125 hover:text-red transition-all duration-200"
                                  />
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="w-2/3 h-1/3 mx-auto">
              <div className="mt-4 flex justify-center gap-x-8">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  ❮
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  ❯
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end w-full col-start-1 col-end-4 sm:col-end-3 row-start-2 sm:row-start-3 row-end-3 sm:row-end-4">
          {customer && <CustomerInfo customer={customer} />}
        </div>

        <div className="row-start-3 sm:row-start-1 row-end-4 col-start-1 sm:col-start-3 col-end-4 flex justify-center">
          <DashboardActions openReviewModal={openReviewCustomerModal} openEditModal={openEditCustomerModal}
          openEditPasswordModal={openEditPasswordCustomerModal} />
        </div>

        <Modal
          isOpen={isReviewModalOpen}
          onRequestClose={closeReviewCustomerModal}
          shouldCloseOnOverlayClick={true}
          contentLabel="Review Modal"
          className="fixed inset-1/2 w'2/3 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white dark:bg-slate-900 rounded-sm shadow-lg"
          overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-10 bg-black"
          ref={modalRefCustomer}
          onAfterOpen={closeModalOnClickOutside}
        >
          <ReviewForm closeReviewModal={closeReviewCustomerModal} toastAlert={toastAlert}/>
        </Modal>

        <Modal
          isOpen={isEditCustomerModalOpen}
          onRequestClose={closeEditCustomerModal}
          shouldCloseOnOverlayClick={true}
          contentLabel="Edit Customer Modal"
          className="fixed inset-1/2 w'2/3 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white dark:bg-slate-900 rounded-sm shadow-lg"
          overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-10 bg-black"
          ref={modalRefCustomer}
          onAfterOpen={closeModalOnClickOutside}
        >
          <EditCustomer closeEditModal={closeEditCustomerModal} />
        </Modal>

        <Modal
          isOpen={isEditPasswordCustomerModalOpen}
          onRequestClose={closeEditPasswordCustomerModal}
          shouldCloseOnOverlayClick={true}
          contentLabel="Edit Password Modal"
          className="fixed inset-1/2 w'2/3 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white dark:bg-slate-900 rounded-sm shadow-lg"
          overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-10 bg-black"
          ref={modalRefPasswordCustomer}
          onAfterOpen={closeModalOnClickOutside}
        >
          <EditPasswordCustomer
            closeEditPasswordModal={closeEditPasswordCustomerModal}
          />
        </Modal>

        <Modal
          isOpen={isEditBookingModalOpen}
          onRequestClose={closeEditBookingModal}
          shouldCloseOnOverlayClick={true}
          contentLabel="Edit Booking Modal"
          className="w-2/6 p-4 bg-white rounded-lg dark:bg-slate-900"
          overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-40 bg-black"
          ref={modalRefBooking}
          onAfterOpen={closeModalOnClickOutside}
        >
          {selectedBookingId && (
            <EditBooking
              bookingId={selectedBookingId}
              allVehicles={allVehicles}
              onClose={closeEditBookingModal}
            />
          )}
        </Modal>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default CustomerDetail;