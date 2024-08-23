import React from "react";
import { FaCircleCheck } from "react-icons/fa6";

const FinalSuccess = () => {
  return (
    <div className="w-screen bg-white z-[10000] fixed top-0 text-center left-0 h-screen flex flex-col gap-2 justify-center items-center text-3xl font-bold text-green-600">
      <FaCircleCheck className="text-7xl" />
      <span className="text-2xl leading-6">
        Success! <br />
        Your account has been created successfully.
      </span>
    </div>
  );
};

export default FinalSuccess;
