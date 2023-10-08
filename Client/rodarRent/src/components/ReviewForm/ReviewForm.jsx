import React from 'react';
import { getLocalStorage } from '../../helpers/storage';
import { useState } from 'react';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../../helpers/routes';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReviewForm = ({toastAlert}) => {
  const navigate = useNavigate();
  const customer = getLocalStorage('loginData');
  //console.log(customer.id);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setReview(value);
  };

  const reviewData = {
    CustomerId: customer.id,
    rating: rating,
    review: review,
  };
  //console.log(reviewData);
  const handlerSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios
        .post(`${API_BASE_URL}/reviews`, reviewData)
        .then((response) => {
          console.log(response);
          toastAlert(`Sent review!, thanks ${customer.name}`, "success");
          setTimeout(() => {
            navigate('/aboutUs');
          }, 4000);
        });

      /*if (response.status === 201) {
        
      } else {
        console.log("Error en la solicitud:", response.statusText);
      }*/
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        // Display the error message from the backend
        toastAlert(error.response.data.error, "error");
      } else {
        // Display a generic error message
        toastAlert('An error occurred while submitting your review.', "error");
      }
      console.log(error);
    }
  };
  return (
    <div className=" font-poppins w-full h-full bg-white dark:bg-slate-900 duration-300 dark:text-gray-100 flex items-center justify-center">
      <div className="drop-shadow-md border bg-slate-50 rounded-xl h-formLaptop dark:bg-slate-900">
        <form className="pt-14 px-16 flex flex-col flex-wrap w-full rounded-xl">
          <div className="flex items-center">
            <h6 className="pr-4 text-xl">Rating</h6>
            {[...Array(5)].map((_, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={
                    index <= (hover || rating)
                      ? 'w-6 h-6 text-yellow-300'
                      : 'w-6 h-6 text-gray-300 dark:text-white'
                  }
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <svg
                    className=""
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </button>
              );
            })}
          </div>
          <div className="py-4 my-4">
            <label htmlFor="review"></label>
            <textarea
              className="p-4 rounded-lg drop-shadow-md border border-gray dark:bg-slate-900 duration-300"
              name="review"
              cols="40"
              rows="10"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col mt-4 mb-4">
            <button
              className="font-poppins bg-blue cursor-pointer rounded-lg p-2 m-2 text-white"
              onClick={handlerSubmit}
            >
              Send review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
