import React, { useState } from "react";
import { Awaiting, ProfileApproved, SummaryImage } from "../../assets/export";

const Summary = () => {
  const [loading, setLoading] = useState(false);
  return (
    <section class="bg-white ">
      <div class="flex justify-center min-h-screen">
        <div class="hidden bg-gray-50 lg:flex justify-center items-center bg-cover  lg:w-2/5">
          <div class="w-full h-full  flex items-center justify-center animate one text-4xl font-bold text-[#c00000]">
            <img
              src="https://fareshare.vercel.app/assets/fareshare_logo-15fzbzBE.svg"
              alt=""
              className="w-[70%]"
            />
          </div>
        </div>
        <div class="flex items-center  w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div class="w-full flex flex-col justify-center items-center gap-6">
            <span className="text-[30px] leading-tight text-center font-semibold text-black">
              Administrative Fees
            </span>
            <img src={SummaryImage} alt="" className="w-[238px] lg:w-auto" />
            <div className="w-full h-auto flex flex-col justify-start items-start">
              <span className="text-lg font-semibold text-black">Driver</span>
              <ul className=" ml-6 mt-1 list-disc text-gray-500 text-lg font-medium">
                <li>Lorem ipsum consectetur. Augue</li>
                <li>Lorem ipsum consectetur. Augue</li>
                <li>Lorem ipsum consectetur. Augue</li>
                <li>Lorem ipsum consectetur. Augue</li>
              </ul>
            </div>

            <div className="w-full flex justify-between items-center">
              <span className="text-lg font-semibold text-black">Price</span>

              <span className="text-md flex justify-center items-center gap-[1px] font-semibold text-black">
                $199
                <span className="text-md font-medium text-gray-500">/week</span>
              </span>
            </div>
            <button
              type="submit"
              disabled={loading}
              class="flex items-center mt-10 justify-center gap-4 w-full  px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#c00000] rounded-full hover:bg-[#c00000] focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50"
            >
              {loading && (
                <div
                  class="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                  role="status"
                  aria-label="loading"
                >
                  <span class="sr-only">Loading...</span>
                </div>
              )}
              <span>Subscribe Now </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 rtl:-scale-x-100"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Summary;
