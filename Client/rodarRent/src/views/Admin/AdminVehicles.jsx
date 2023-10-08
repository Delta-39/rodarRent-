//*Hooks & Tools
import { useEffect, useState, useRef } from "react";
import { BiMessageAltCheck, BiMessageAltX, BiSearch } from "react-icons/bi";
import Modal from "react-modal";
import axios from "axios";
import { API_BASE_URL } from "../../helpers/routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//*Components
import Loader from "../../components/Loader/Loader";
import VehicleCard from "../../components/AdminComponents/AdminVehicles/VehicleCard";
import Pagination from "../../components/AdminComponents/AdminVehicles/PaginationAdminVehicle";
import EditVehicle from "../../components/AdminComponents/AdminVehicles/EditVehicle/EditVehicle";
import CreateVehicle from "../../components/AdminComponents/AdminVehicles/CreateVehicle/CreateVehicle";

const AdminVehicles = () => {
  const searchRef = useRef(null);

  const [loading, setLoading] = useState(true);
  //*Render, vehicles and pagination states
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [vehicles, setVehicles] = useState({ results: [] });
  //*Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  //*Selected Vehicle
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isEditSubmitted, setIsEditSubmitted] = useState(false);
  //*SearchBar States
  const [searchParams, setSearchParams] = useState({
    domain: "",
    model: "",
    brand: "",
  });
  const [isSearchingDomain, setIsSearchingDomain] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  //*carga inicial y paginado
  useEffect(() => {
    loading || setLoading(true);
    const limit = 3;
    const offset = (currentPage - 1) * limit;
    const params = { limit, offset };
    for (let prop in searchParams) {
      if (searchParams[prop]) {
        params[prop] = searchParams[prop];
      }
    }
    //if (!isSearching) {
    axios
      .get(`${API_BASE_URL}/vehicles`, { params })
      .then((response) => {
        setVehicles(response.data);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    //}
  }, [currentPage]);

  //*actualiza vehicles post eliminacion y editado
  useEffect(() => {
    loading || setLoading(true);

    const limit = 3;
    const offset = (currentPage - 1) * 3;

    if (selectedVehicle === null || isEditSubmitted === true) {
      axios
        .get(`${API_BASE_URL}/vehicles`, {
          params: { limit, offset },
        })
        .then((response) => {
          setVehicles(response.data);
          setTotalPages(response.data.totalPages);
          setIsEditSubmitted(false);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setLoading(false);
    }
  }, [selectedVehicle, isEditSubmitted]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const openModal = (modalId, vehicleId, vehicleDomain) => {
    if (modalId === 1) {
      setIsDeleteModalOpen(true);
      setSelectedVehicle({ id: vehicleId, domain: vehicleDomain });
    } else if (modalId === 2) {
      setIsEditModalOpen(true);
      setSelectedVehicle({ id: vehicleId });
    } else if (modalId === 3) {
      setIsCreateModalOpen(true);
    }
  };

  const closeModal = (modalId) => {
    switch (modalId) {
      case 1:
        setIsDeleteModalOpen(false);
        break;
      case 2:
        setIsEditModalOpen(false);
        break;
      case 3:
        setIsCreateModalOpen(false);
        break;
    }
  };

  const handleDelete = async (vehicleId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/vehicles/${vehicleId}`
      );
      toast.success(response.data);
      closeModal(1);
      setSelectedVehicle(null);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const limit = 3;
    const offset = 0; //(currentPage - 1) * 3; // yo cada vez que haga una búsqueda volvería a la pagina 1 (offset = 0)

    if (true) {
      //(searchParams.domain || searchParams.model || searchParams.brand) {
      const params = { limit, offset };
      for (let prop in searchParams) {
        if (searchParams[prop]) {
          params[prop] = searchParams[prop];
        }
      }
      try {
        const response = await axios.get(`${API_BASE_URL}/vehicles`, {
          params,
        });

        if (searchParams.domain) {
          setIsSearchingDomain(true); //* doesn't show pagination buttons when the user searches a domain
          // setSearchParams((prevParams) => ({
          //   ...prevParams,
          //   domain: "",
          // }));
          setVehicles({ results: [] });
          setVehicles(response.data);
        } else {
          setIsSearching(true);
          // setSearchParams({
          //   domain: "",
          //   model: "",
          //   brand: "",
          // });
          setVehicles(response.data);
          setTotalPages(response.data.totalPages);
        }

        if (searchRef.current) {
          searchRef.current.value = "";
        }
      } catch (error) {
        console.log(error);
        // Manejar el error aquí si es necesario
      }
    } else {
      setIsSearchingDomain(false);
      setIsSearching(false);
      setCurrentPage(2); // esto no entiendo porqué pero no debería romper nada
    }
  };

  const onClear = () => {
    setSearchParams({
      domain: "",
      brand: "",
      model: "",
    });
    window.location.reload();
  };

  return (
    <>
      {loading ? (
        <div className="h-[calc(100vh-112px)] w-[calc(100vw-256px)] flex items-center justify-center dark:bg-slate-900 dark:text-gray-100 ">
          <Loader />
        </div>
      ) : (
        <div className="w-[calc(100vw-256px)] min-h-[calc(100vh-112px)] px-14 py-2 dark:bg-slate-900 dark:text-gray-100 ">
          {/* SearchBar */}
          <div className="mb-3 flex w-3/5 justify-between">
            <div className="bg-white border text-lg border-gray-200 rounded-lg drop-shadow-lg w-1/4 flex items-center dark:bg-slate-950 dark:border-none">
              <input
                ref={searchRef}
                name="domain"
                value={searchParams.domain}
                onChange={handleChange}
                className="px-3 py-2 w-4/5 text-sm dark:bg-slate-950"
                type="text"
                placeholder="Type a car domain"
              />
              <button
                onClick={handleSubmit}
                className="w-1/5 py-3 px-3 flex justify-center items-center hover:scale-125 transition-transform duration-300"
              >
                <BiSearch />
              </button>
            </div>
            <div className="bg-white border text-lg border-gray-200 rounded-lg drop-shadow-lg w-1/4 flex items-center ml-1 dark:bg-slate-950 dark:border-none">
              <input
                ref={searchRef}
                name="brand"
                value={searchParams.brand}
                onChange={handleChange}
                className="px-3 py-2 w-4/5 text-sm dark:bg-slate-950"
                type="text"
                placeholder="Type a car brand"
              />
              <button
                onClick={handleSubmit}
                className="w-1/5 py-3 px-3 flex justify-center items-center hover:scale-125 transition-transform duration-300"
              >
                <BiSearch />
              </button>
            </div>
            <div className="bg-white border text-lg border-gray-200 rounded-lg drop-shadow-lg w-1/4 flex items-center ml-1 dark:bg-slate-950 dark:border-none">
              <input
                ref={searchRef}
                name="model"
                value={searchParams.model}
                onChange={handleChange}
                className="px-3 py-2 w-4/5 text-sm dark:bg-slate-950"
                type="text"
                placeholder="Type a car model"
              />
              <button
                onClick={handleSubmit}
                className="w-1/5 py-3 px-3 flex justify-center items-center hover:scale-125 transition-transform duration-300"
              >
                <BiSearch />
              </button>
            </div>
            <div
              className="bg-white border text-sm border-gray-200 flex rounded-lg font-poppins drop-shadow-lg ml-auto w-1/5 items-center dark:bg-slate-950 dark:border-none hover:cursor-pointer"
              onClick={onClear}
            >
              <p className="px-2 py-2 text-sm text-gray-500 mx-auto dark:bg-slate-950 dark:text-gray-100">
                Clear Search
              </p>
            </div>
          </div>
          <div className="flex justify-between  ">
            <div className="w-3/5 xl:w-4/6  flex flex-col justify-between">
              <div className="">
                {vehicles?.results?.map((vehicle, index) => (
                  <VehicleCard
                    index={index}
                    key={index}
                    vehicle={vehicle}
                    openModal={openModal}
                  />
                ))}

                {isSearchingDomain ? null : (
                  <div className=" flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={onPageChange}
                    />
                  </div>
                )}
              </div>
            </div>
            {/* Actions Panel */}
            <div className="w-1/5 bg-white border border-gray-200 drop-shadow-lg rounded-lg font-poppins p-4 dark:bg-slate-950 dark:border-none">
              <div className="text-4xl font-normal border-b border-b-gray-300">
                <h1>Actions</h1>
              </div>
              <br></br>
              <div
                className="w-full bg-white border-gray-200 drop-shadow-lg rounded-lg font-poppins p-2 text-sm text-center hover:cursor-pointer dark:bg-slate-900"
                onClick={() => openModal(3)}
              >
                <h4>Create New Vehicle</h4>
              </div>
            </div>
          </div>
          <Modal
            className="w-2/6 p-4 bg-white rounded-lg dark:bg-slate-900"
            overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-40 bg-black"
            isOpen={isDeleteModalOpen}
            onRequestClose={() => closeModal(1)}
          >
            {selectedVehicle && (
              <div className="w-full h-full bg-white flex flex-col items-center justify-center font-poppins dark:bg-slate-900 dark:text-gray-100">
                <h3 className="text-2xl font-bold">
                  Are you sure you want to delete this vehicle?
                </h3>
                <h2 className="pt-5 text-lg  ">
                  Domain:{" "}
                  <span className="font-semibold">
                    {selectedVehicle.domain}
                  </span>
                </h2>
                <div className="flex justify-evenly w-full pt-5 ">
                  <button
                    onClick={() => handleDelete(selectedVehicle.id)}
                    className=" w-1/5 py-1 flex justify-evenly items-center text-lg rounded-md border border-gray-300 bg-white drop-shadow-lg hover:drop-shadow-none hover:bg-green-700 hover:text-white transition-all duration-300 dark:bg-slate-950 dark:hover:bg-green-700"
                  >
                    Yes
                    <BiMessageAltCheck />
                  </button>
                  <button
                    onClick={() => closeModal(1)}
                    className=" w-1/5 py-1 flex items-center justify-evenly text-lg rounded-md border border-gray-300 bg-white drop-shadow-lg hover:drop-shadow-none hover:bg-red hover:text-white transition-all duration-300 dark:bg-slate-950 dark:hover:bg-red "
                  >
                    No
                    <BiMessageAltX />
                  </button>
                </div>
              </div>
            )}
          </Modal>
          <Modal
            className="w-2/6 p-4 bg-white rounded-lg dark:bg-slate-900"
            overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-40 bg-black"
            isOpen={isEditModalOpen}
            onRequestClose={() => closeModal(2)}
          >
            <EditVehicle
              setIsEditSubmitted={setIsEditSubmitted}
              selectedVehicle={selectedVehicle}
              toast={toast}
              closeModal={closeModal}
            />
          </Modal>
          <Modal
            className="w-1/3 min-h-[90dvh] p-4 bg-white rounded-xl flex flex-col dark:bg-slate-900"
            overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-40 bg-black"
            isOpen={isCreateModalOpen}
            onRequestClose={() => closeModal(3)}
          >
            <CreateVehicle onClose={() => closeModal(3)} />
          </Modal>
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
      )}
    </>
  );
};

export default AdminVehicles;
