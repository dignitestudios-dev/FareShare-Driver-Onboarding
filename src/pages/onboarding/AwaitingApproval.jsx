import React, { useEffect } from "react";
import { Awaiting } from "../../assets/export";

const AwaitingApproval = () => {
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
            <span className="text-[30px] font-semibold text-black">
              Awaiting Approval
            </span>
            <img src={Awaiting} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwaitingApproval;
