import React, { useEffect } from "react";
import { Awaiting } from "../../assets/export";

const AwaitingApproval = () => {
  return (
    <div class="w-full  bg-white">
      <div class="grid lg:grid-cols-4 md:grid-cols-3 items-center">
        <section class="lg:col-span-3 md:col-span-2 max-w-2xl w-full lg:p-6 mx-auto  ">
          <div class="flex justify-center w-full min-h-screen">
            <div class="flex items-center  w-full  p-6 lg:px-12">
              <div class="w-full flex flex-col justify-center items-center gap-6">
                <div className="w-full flex flex-col justify-center items-center  gap-2">
                  <span className="text-[30px] font-semibold text-black">
                    Awaiting Approval
                  </span>
                  <span className="text-[14px] font-medium text-gray-700 text-center">
                    Wait for the admin to approve your profile by verifying your
                    personal and vehicle information.
                  </span>
                </div>
                <img src={Awaiting} alt="" />
              </div>
            </div>
          </div>
        </section>
        <div class="flex flex-col justify-center space-y-16 md:h-screen max-md:mt-16 min-h-full bg  py-4">
          <div className="px-4">
            <h4 class="text-white text-lg font-semibold">Sign up</h4>
            <p class="text-[13px] text-white mt-2">
              Register yourself by filling out your account specific data.
            </p>
          </div>

          <div className=" px-4 ">
            <h4 class="text-white  text-lg font-semibold">Complete Profile</h4>
            <p class="text-[13px] text-white mt-2">
              Complete your profile by providing your personal details for your
              account.
            </p>
          </div>
          <div className=" px-4">
            <h4 class="text-white  text-lg font-semibold">Add Vehicle</h4>
            <p class="text-[13px] text-white mt-2">
              Add your primary vehicle images, and documentation to access
              seamless driving experience.
            </p>
          </div>
          <div className="mx-4 rounded-2xl p-4 bg-white">
            <h4 class="text-[#c00000]  text-lg font-semibold">
              Admin Approval
            </h4>
            <p class="text-[13px] text-[#c00000] mt-2">
              Wait for the admin to approve your profile by verifying your
              personal and vehicle information.
            </p>
          </div>
          <div className="px-4">
            <h4 class="text-white  text-lg font-semibold">Buy Subscription</h4>
            <p class="text-[13px] text-white mt-2">
              Attach your card and buy a weekly subscription to access the
              features of the platform.
            </p>
          </div>

          <div className="px-4">
            <h4 class="text-white  text-lg font-semibold">Add Bank</h4>
            <p class="text-[13px] text-white mt-2">
              Add your bank account details for future funds and your rides
              payment recieving.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwaitingApproval;
