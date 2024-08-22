import React from "react";

const SocialSignupModal = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`w-screen fixed top-0 p-3 left-0 h-screen flex justify-center items-center ${
        isOpen ? "scale-1" : "scale-0"
      } `}
    >
      <div className="w-full lg:w-[800px] rounded-3xl shadow-lg border bg-white p-3 h-auto flex flex-col items-center justify-center gap-2">
        <form class="w-full flex flex-col gap-6  ">
          <div className="w-full flex flex-col gap-2 ">
            <img
              src="https://fareshare.vercel.app/assets/fareshare_logo-15fzbzBE.svg"
              alt=""
              className="h-14"
            />
            <span className="w-full text-center text-2xl font-semibold text-gray-700">
              Contact & Referrals
            </span>
            <div className="w-full">
              <input
                type="text"
                id="email"
                name="email"
                // value={values.email}
                // onChange={handleChange}
                // onBlur={handleBlur}
                placeholder="Phone Number"
                // class={`block w-full px-5 py-3 mt-1.5 text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-full   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                //   errors.email && touched.email ? "border-red-600 shake" : null
                // }`}
                class={`block w-full px-5 py-3 mt-1.5 text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-full   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300`}
              />
              {/* {errors.email && touched.email ? (
                <p className="text-red-700 text-sm ml-1 font-medium">
                  {errors.email}
                </p>
              ) : null} */}
            </div>
            <div className="w-full">
              <input
                type="text"
                id="email"
                name="email"
                // value={values.email}
                // onChange={handleChange}
                // onBlur={handleBlur}
                placeholder="Referal Code"
                // class={`block w-full px-5 py-3 mt-1.5 text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-full   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                //   errors.email && touched.email ? "border-red-600 shake" : null
                // }`}
                class={`block w-full px-5 py-3 mt-1.5 text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-full   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300`}
              />
              {/* {errors.email && touched.email ? (
                <p className="text-red-700 text-sm ml-1 font-medium">
                  {errors.email}
                </p>
              ) : null} */}
            </div>
            <button
              type="submit"
              // disabled={loading}
              class="flex items-center justify-center gap-4 mt-2 w-full  px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#c00000] rounded-full hover:bg-[#c00000] focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50"
            >
              {/* {loading && (
                  <div
                    class="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                    role="status"
                    aria-label="loading"
                  >
                    <span class="sr-only">Loading...</span>
                  </div>
                )} */}
              <span>Get Started </span>

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
        </form>
      </div>
    </div>
  );
};

export default SocialSignupModal;
