import { BiLogOut} from "react-icons/bi"


const WelcomeCustomer = ({ customer, onLogout }) => {
  return (
    <div className="w-full h-full flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center sm:px-14 gap-y-10 sm:gap-y-2">
      {customer && (
        <div className="flex items-center mr-auto sm:mr-1">
        <h2 className="text-3xl font-semibold" >Welcome Back! <br></br><span className=" text-blue" >{`${customer.name} ${customer.lastName}`}</span></h2>
        </div>
      )}
      {customer && (
        <div>
          <button
            className=" bg-blue basis-2/4 py-1 w-44 text-gray-100 rounded-lg text-xl flex items-center justify-evenly ml-auto" 
            onClick={onLogout}
          >
            <BiLogOut size='24px'/>
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default WelcomeCustomer;
