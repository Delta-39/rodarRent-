import { BiMessageAltCheck, BiMessageAltX } from 'react-icons/bi';

function AdminConfirmationModal({ onClose, onDelete }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-md backdrop-filter bg-opacity-60">
      <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-lg text-gray-900 dark:text-gray-100 text-center">
        <h3 className="text-2xl font-bold mb-4">
        Are you sure you give admin permission?
        </h3>
        <div className="flex justify-evenly w-full pt-5">
          <button
            onClick={onDelete}
            className="w-1/5 py-1 flex justify-evenly items-center text-lg rounded-md border border-gray-300 bg-white drop-shadow-lg hover:drop-shadow-none hover:bg-green-700 hover:text-white transition-all duration-300"
          >
            Yes <BiMessageAltCheck />
          </button>
          <button
            onClick={onClose}
            className="w-1/5 py-1 flex items-center justify-evenly text-lg rounded-md border border-gray-300 bg-white drop-shadow-lg hover:drop-shadow-none hover:bg-red hover:text-white transition-all duration-300"
          >
            No <BiMessageAltX />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminConfirmationModal;
