
const CustomerInfo = ({ customer }) => {
  return (
    <div className="w-full p-4">
      <div className='border-b-2 border-gray-300' >
        <h1 className=" text-2xl font-medium text-black font-poppins dark:text-gray-100">
          Personal Info
        </h1>
      </div>
      <div className="w-full rounded-lg  bg-white border border-gray-300 drop-shadow-md mt-10 dark:bg-slate-900 dark:border-none">
        <div className="grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-3 gap-2 sm:gap-3 ">
          {[
            { label: 'Name', value: customer.name },
            { label: 'Last Name', value: customer.lastName },
            { label: 'Personal ID', value: customer.personalId },
            { label: 'Birth Date', value: customer.birthDate },
            { label: 'Address', value: customer.address },
            { label: 'City', value: customer.city },
            { label: 'Country', value: customer.country },
            { label: 'Zip Code', value: customer.zipCode },
            { label: 'Phone', value: customer.phoneNumber },
          ].map(({ label, value }) => (
            <div key={label} className="w-full h-13 px-6 py-3 sm:py-6 bg-white dark:bg-slate-950 rounded-md shadow">
              <p className="font-poppins text-black dark:text-gray-100 text-16 font-normal">
                {label}: {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
