import { Link } from 'react-router-dom';
import DashboardActionsImg from '../../assets/img/dashboardClient.webp';


const DashboardActions = ({  openReviewModal, openEditModal, openEditPasswordModal, toast }) => {

  const handleClick  = () =>{
    toast.success('Thank you for suscribing to our newsletter!')
  }


  return (
    <div className="w-96 h-form rounded-t-lg p-4 flex flex-col items-center">
      <div className="w-full h-2/3">
        <img src={DashboardActionsImg} alt="Dashboard" className="w-full h-full object-cover rounded-t-lg" />
      </div>
      <div className='h-1/3 w-full bg-white drop-shadow-md p-4 border border-gray-300 rounded-b-lg dark:bg-slate-900'>
        <h2 className="text-lg font-bold text-left">Actions</h2>
        <hr className="border border-gray-300" />
        <ul className="flex flex-col space-y-2 items-center h-3/4 mt-6 justify-evenly">
          <li className="w-full">
            <button onClick={handleClick} className=" w-full text-blue-600 py-1 px-8 rounded-lg bg-white drop-shadow-lg border border-gray-300 dark:bg-slate-950 hover:drop-shadow-none">Subscribe to our newsletter</button>
          </li>
          <li className="w-full">
            <button
              onClick={openReviewModal}
              className="w-full py-0.5 px-8 rounded-lg bg-white drop-shadow-lg text-blue-600 border border-gray-300 dark:bg-slate-950 hover:drop-shadow-none block">
              Give us your review
            </button>
          </li>
          <li className="w-full">
            <button
              onClick={openEditModal}
              className="w-full py-0.5 px-8 rounded-lg bg-white drop-shadow-lg text-blue-600 border border-gray-300 dark:bg-slate-950 hover:drop-shadow-none block">
              Edit your personal info
            </button>
          </li>
          <li className="w-full">
            <button
              onClick={openEditPasswordModal}
              className="w-full py-0.5 px-8 rounded-lg bg-white drop-shadow-lg text-blue-600 border border-gray-300 dark:bg-slate-950 hover:drop-shadow-none block">
              Edit Password
            </button>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default DashboardActions;

