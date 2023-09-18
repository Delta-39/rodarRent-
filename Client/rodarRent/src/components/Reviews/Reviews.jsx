import React from "react";
import Review from "../Review/Review";
import dataReview from "./dataReview";

console.log(dataReview);
const countReviews = dataReview.length;
let sumRating = 0;
dataReview.map((rev) => (sumRating += rev.rating));
const promRating = (sumRating / countReviews).toFixed(2);
//console.log(promRating);

const Reviews = () => {
  return (
    <div className="p-4 m-4">
      <div class="font-poppins text-sm p-4 m-4 flex items-center">
        <svg
          class="w-4 h-4 text-yellow-300 mr-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <p class="ml-2 text-sm font-bold text-gray-900 dark:text-white">{promRating}</p>
        <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
        <a
          href="#"
          class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
        >
          {`${countReviews} reviews`}
        </a>
      </div>
      <div>
        {dataReview.map((rev) => (
          <Review rev={rev} key={rev.id} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
