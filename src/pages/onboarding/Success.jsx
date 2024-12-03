import React, { useContext, useEffect, useState } from "react";
import { ProfileApproved } from "../../assets/export";
import { AppContext } from "../../context/AppContext";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { ErrorToast } from "../../components/global/Toast";

const Success = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { error, setError } = useContext(AppContext);
  const [response, setResponse] = useState(null);
  useEffect(() => {
    setLoading(true);
    axios
      .post("/subscription/validateStripeSub", {
        stripeSubscriptionId: localStorage.getItem("subscriptionId"),
        paymentIntentId: localStorage.getItem("paymentIntent"),
      })
      .then((response) => {
        if (response?.data?.status == true) {
          localStorage.removeItem("subscriptionId");
          localStorage.removeItem("paymentIntent");
          navigate("/add-bank");
        } else {
          navigate("/add-card");
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        ErrorToast(error?.response?.data?.message || "Something went wrong");
        navigate("/signup");
      });
  }, []);

  return loading ? (
    <div className="w-screen h-screen flex justify-center items-center text-3xl font-bold text-[#c00000]">
      <div
        class="animate-spin inline-block size-20 border-[3px] border-current border-t-transparent text-[#c00000] rounded-full"
        role="status"
        aria-label="loading"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  ) : response?.status ? (
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
              Congrats! <br /> Your Subscription is <br /> now active.
            </span>
            <img src={ProfileApproved} alt="" />
          </div>
        </div>
      </div>
    </section>
  ) : (
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
            <span className="text-[18px] leading-tight text-center font-semibold text-black">
              Oops! Unfortunately your subscription got failed. <br /> We are
              redirecting you to the subscription page again <br /> .
            </span>
            <img src={ProfileApproved} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Success;
