import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";
import Loader from "../../components/Loader/Loader";
import PaginationAdminCustomer from "../../components/AdminComponents/AdminClients/PaginationAdminCustomer";
import axios from "axios";
import { BiTrash, BiSearchAlt, BiX } from 'react-icons/bi';
import { MdOutlineAdminPanelSettings, MdAdminPanelSettings } from 'react-icons/md';
import { API_BASE_URL } from "../../helpers/routes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteConfirmationModal from "../../components/AdminComponents/AdminClients/DeleteConfirmationModal";
import AdminConfirmationModal from "../../components/AdminComponents/AdminClients/AdminConfirmationModal";

function AdminClients() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [showClearButton, setShowClearButton] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(15);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [notificationShown, setNotificationShown] = useState(false);
  const [sortOrder, setSortOrder] = useState("ASC");
  const [filterCriteria, setFilterCriteria] = useState({
    name: "",
    orderVar: "lastName",
    orderMode: "ASC",
  });
  const [searching, setSearching] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const pageSizeToFetchAll = searchTerm ? 1000 : pageSize;

      const response = await axios.get(`${API_BASE_URL}/customers/filter`, {
        params: {
          ...filterCriteria,
          page: searching ? 1 : currentPage,
          pageSize: pageSizeToFetchAll,
        },
      });

      const fetchedCustomers = response.data.data;
      setCustomers(fetchedCustomers);
      setTotalPages(Math.ceil(response.data.pagination.totalItems / pageSize));

      const filteredCustomers = fetchedCustomers.filter((customer) => {
        const searchableFields = [
          customer.name,
          customer.lastName,
          customer.personalId,
          customer.country,
          customer.city,
          customer.address,
          customer.email,
          customer.isActive ? "Yes" : "No",
          //customer.UserId,
        ];

        return searchableFields.some((field) =>
          field.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      setFilteredCustomers(filteredCustomers);

      setLoading(false);
      setError(null);
    } catch (error) {
      setError();
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, filterCriteria, searching]);

  const handleCustomerSelect = (customerId) => {
    if (selectedCustomers.includes(customerId)) {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };


  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCustomers([]);
    } else {
      const allCustomerIds = customers.map((customer) => customer.id);
      setSelectedCustomers(allCustomerIds);
    }
    setSelectAll(!selectAll);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const handlePageChange = (currentPage) => {
    if (!searching) {
      setCurrentPage(currentPage);
    }
  };
  const handleDeactivateSelectedCustomer = async (customerIds) => {
    try {
      const deactivateRequests = customerIds.map(async (customerId) => {
        const deleteResponse = await axios.delete(`${API_BASE_URL}/customers/${customerId}`);

        if (deleteResponse.status === 200) {
          toast.success('Successfully deleted customer', {
            position: 'top-left',
            autoClose: 3000,
          });


          return { success: true };
        } else {
          return { success: false };
        }
      });

      const results = await Promise.all(deactivateRequests);
      const hasError = results.some((result) => !result.success);

      if (!hasError) {
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) => {
            if (customerIds.includes(customer.id)) {
              return {
                ...customer,
                isActive: false,
              };
            }
            return customer;
          })
        );
        setTimeout(() => {
          fetchData();
        }, 3000);
      } else {
        setError("");
      }
    } catch (error) {
      setError("");
    }
  };

  const handleAdminSelectedCustomer = async (customerIds) => {
    try {
      const adminRequests = customerIds.map(async (customerId) => {
        try {
          const getResponse = await fetch(`${API_BASE_URL}/customers/${customerId}`);

          if (!getResponse.ok) {
            return { success: false };
          }

          const customerData = await getResponse.json();

          if (customerData.UserId === 1) {
            toast.error('User is already an admin', {
              position: 'top-left',
              autoClose: 3000,
            });
            return { success: false };
          }

          customerData.UserId = 1;

          const putResponse = await fetch(`${API_BASE_URL}/customers/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerData),
          });

          if (!putResponse.ok) {
            console.error(`PUT request failed with status ${putResponse.status}`);
            const errorResponse = await putResponse.json();
            console.error('Error Response:', errorResponse);
            return { success: false };
          }


          return { success: putResponse.status === 200 };
        } catch (error) {
          console.error(error);
          return { success: false };
        }
      });

      const results = await Promise.all(adminRequests);

      const hasError = results.some((result) => !result.success);

      if (!hasError) {
        toast.success('Successfully updated customers', {
          position: 'top-left',
          autoClose: 3000,
        });
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) => {
            if (customerIds.includes(customer.id)) {
              return {
                ...customer,
                UserId: 1,
              };
            }
            return customer;
          })
        );
        setSelectedCustomers([]);
      } else {
        setError();
      }
    } catch (error) {
      console.error(error);
      setError();
    }
  };


  if (loading) {
    return (
      <div className="w-[calc(100vw-256px)] min-h-[calc(100vh-112px)] flex justify-center items-center" >
        <Loader />
      </div>
    )
  }

  const handleFilterChange = (key, value) => {
    setFilterCriteria({
      ...filterCriteria,
      [key]: value,
    });
  };

  const handleSearchButtonClick = () => {
    setSearching(true);
    setCurrentPage(1);
    setShowClearButton(true);
    fetchData();
  };

  const handleToggleSortOrder = () => {

    const newSortOrder = sortOrder === "ASC" ? "DESC" : "ASC";
    setSortOrder(newSortOrder);


    handleFilterChange("orderMode", newSortOrder);
  };

  const handleDeleteButtonClick = () => {
    if (selectedCustomers.length === 0) {
      toast.error('Please select at least one customer', {
        position: 'top-left',
        autoClose: 3000,
      });
    } else {

      setShowDeleteModal(true);
    }
  };
  const handleAdminButtonClick = () => {
    if (selectedCustomers.length === 0) {
      toast.error('Please select at least one customer', {
        position: 'top-left',
        autoClose: 3000,
      });
    } else {

      setShowAdminModal(true);
    }
  };

  const handleClearButtonClick = () => {
    fetchData();
    setSearching(false);
    setSearchTerm("");
    setCurrentPage(1);
    setShowClearButton(false);
  };

  return (
    <div className="w-[calc(100vw-256px)] min-h-[calc(100vh-112px)] justify-between px-14 py-2 dark:bg-slate-900 dark:text-gray-100">
      <div className="flex w-full justify-between">
        <div className="w-1/4 mb-3 relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-3/4 p-2 outline-none border rounded dark:bg-slate-950 ${searchTerm ? 'border-gray-300' : 'border-gray-900'}`}
          />
          {showClearButton && (
            <button
              onClick={handleClearButtonClick}
              className="p-2 bg-red-500 rounded-full"
            >
              <BiX className="ml-2 cursor-pointer hover:scale-125 hover:text-red transition-all duration-200 text-2xl" />
            </button>
          )}
          {
            <button
              onClick={handleSearchButtonClick}
              className={`absolute top-0 p-2 bg-blue-500 rounded-r-lg ${!searchTerm && 'disabled:opacity-50 cursor-not-allowed'}`}
              disabled={!searchTerm}
            >
              <BiSearchAlt className="cursor-pointer hover:scale-125 hover:text-blue transition-all duration-200 text-2xl" />
            </button>}
        </div>

        <div className="w-1/4 flex justify-between mb-3 border-gray-900 " >

          <div className="w-full border-gray-900 flex items-center">
            <select
              className="w-full border-gray-900 dark:bg-slate-950"
              value={filterCriteria.orderVar}
              onChange={(e) => handleFilterChange("orderVar", e.target.value)}
            >
              <option value="lastName">Last Name</option>
              <option value="name">Name</option>
              <option value="UserId">Admin</option>
              <option value="city">City</option>
              <option value="country">Country</option>
              <option value="isActive">Status</option>
            </select>
          </div>
          <div className="w-full flex items-center justify-end">
            <button
              onClick={handleToggleSortOrder}
              className="p-2 bg-blue-500 rounded-r-lg"
            >
              {sortOrder === "ASC" ? (
                <FaSortAmountUpAlt className="ml-2 cursor-pointer hover:scale-125 hover:text-blue transition-all duration-200 text-2xl" />
              ) : (
                <FaSortAmountDown className="ml-2 cursor-pointer hover:scale-125 hover:text-blue transition-all duration-200 text-2xl" />
              )}
            </button>
            <button
              onClick={handleToggleSortOrder}
              className="p-2 bg-blue-500 rounded-l-lg"
            >
              {sortOrder === "DESC" ? (
                <FaSortAmountUpAlt className="ml-2 cursor-pointer hover:scale-125 hover:text-blue transition-all duration-200 text-2xl" />
              ) : (
                <FaSortAmountDown className="ml-2 cursor-pointer hover:scale-125 hover:text-blue transition-all duration-200 text-2xl" />
              )}
            </button>

          </div>
          
        </div>
        <div className="w-1/4 p-2 flex items-center justify-end">
          <button
            onClick={handleAdminButtonClick}

          >
            <MdOutlineAdminPanelSettings className="ml-2 cursor-pointer 3xl hover:scale-125 hover:text-yellow-600 transition-all duration-200 text-2xl" />
          </button>
          <button
            onClick={handleDeleteButtonClick}

          >
            <BiTrash className="ml-2 cursor-pointer hover:scale-125 hover:text-red transition-all duration-200 text-2xl" />
          </button>
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th className="w-60">Name</th>
            <th className="w-60">Last Name</th>
            <th className="w-60">Personal ID</th>
            <th className="w-60">Country</th>
            <th className="w-60">City</th>
            <th className="w-60">Address</th>
            <th className="w-60">Email</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id} style={{ height: "40px" }}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedCustomers.includes(customer.id)}
                  onChange={() => handleCustomerSelect(customer.id)}
                />
              </td>
              <td>
                <div className="flex items-center">
                  <a href={`/customer/${customer.id}`}>{customer.name}</a>
                  {customer.UserId === 1 &&
                    <MdAdminPanelSettings className="text-yellow-600 mr-2" />}
                </div>
              </td>
              <td>
                <a href={`/customer/${customer.id}`}>{customer.lastName}</a>
              </td>
              <td>
                <a href={`/customer/${customer.id}`}>{customer.personalId}</a>
              </td>
              <td>
                <a href={`/customer/${customer.id}`}>{customer.country}</a>
              </td>
              <td>
                <a href={`/customer/${customer.id}`}>{customer.city}</a>
              </td>
              <td>
                <a href={`/customer/${customer.id}`}>{customer.address}</a>
              </td>
              <td>
                <a href={`/customer/${customer.id}`}>{customer.email}</a>
              </td>
              <td>
                {customer.isActive ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center">
        {!searching && (
          <div className="flex justify-center">
            <PaginationAdminCustomer
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
      {showDeleteModal && (
        <DeleteConfirmationModal
          onClose={() => setShowDeleteModal(false)}
          onDelete={() => {
            handleDeactivateSelectedCustomer(selectedCustomers);
            setShowDeleteModal(false);
          }}
        />
      )}
      {showAdminModal && (
        <AdminConfirmationModal
          onClose={() => setShowAdminModal(false)}
          onDelete={() => {
            handleAdminSelectedCustomer(selectedCustomers);
            setShowAdminModal(false);
          }}
        />
      )}
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
}

export default AdminClients;
