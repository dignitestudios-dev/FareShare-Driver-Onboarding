import React, { useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { Awaiting, ProfileApproved } from "../../assets/export";

const FinalSuccess = () => {
  return (
    <div class="flex justify-center w-full min-h-screen">
      <div class="flex items-center  w-full  p-6 lg:px-12">
        <div class="w-full flex flex-col justify-center items-center gap-6">
          <span className="text-[30px] leading-tight text-center font-semibold text-black">
            Congrats! <br /> Your Subscription is <br /> now active.
          </span>
          <span className="text-[14px] font-medium text-gray-700 text-center">
            Please tap on the close button on top left corner to access your
            application seamlessly.
          </span>
          <img src={ProfileApproved} alt="" />
        </div>
      </div>
    </div>
  );
};

export default FinalSuccess;
