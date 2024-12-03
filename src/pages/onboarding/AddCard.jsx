import React, { useContext, useEffect } from "react";

import { AppContext } from "../../context/AppContext";
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "../../axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { Card } from "../../assets/export";
import { ErrorToast } from "../../components/global/Toast";

const AddCard = () => {
  // Load your Stripe public key
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);
  const { clientSecret, setClientSecret, paymentIntent, setPaymentIntent } =
    useContext(AppContext);

  const [secretLoading, setSecretLoading] = useState(false);

  useEffect(() => {
    setSecretLoading(true);

    // Fetch the client secret from your backend
    axios
      .get("/subscription/createStripeSub")
      .then((response) => {
        setClientSecret(response?.data?.clientSecret);
        setPaymentIntent(response?.data?.stripeSubscriptionId);
        localStorage.setItem(
          "subscriptionId",
          response?.data?.stripeSubscriptionId
        );
        localStorage.setItem("paymentIntent", response?.data?.paymentIntentId);
        setSecretLoading(false);
      })
      .catch((error) => {
        ErrorToast(error?.response?.data?.message || "Something went wrong.");
        setSecretLoading(false);
      });
  }, []);

  return (
    <div class="w-full  bg-white">
      <div class="grid lg:grid-cols-4 md:grid-cols-3 items-center">
        <section class="lg:col-span-3 md:col-span-2 max-w-2xl w-full lg:p-6 mx-auto ">
          <div class="flex justify-center w-full min-h-screen">
            <div class="flex items-center  w-full  p-6 lg:px-12">
              <div class="w-full">
                <div className="w-full flex justify-center items-center">
                  {/* <Link
                to={"/add-card"}
                className="w-10 h-10 mr-auto rounded-full flex justify-center items-center text-md bg-[#c00000] text-white"
              >
                <FaArrowLeft />
              </Link> */}
                  <h1 class="text-[17px] lg:text-[24px] font-semibold text-center tracking-tight text-gray-800 capitalize ">
                    Card details{" "}
                  </h1>
                </div>
                <div className="w-full flex justify-center items-center my-6">
                  <img src={Card} alt="" />
                </div>

                {secretLoading ? (
                  <div className="flex flex-col gap-4">
                    <div className="bg-gray-300 rounded h-48 w-full animate-pulse"></div>
                    <div className="bg-gray-300 rounded h-10 w-full animate-pulse"></div>
                  </div>
                ) : (
                  !secretLoading &&
                  clientSecret && (
                    <Elements
                      stripe={stripePromise}
                      options={{
                        clientSecret: clientSecret,
                        appearance: {
                          theme: "stripe",
                          variables: {
                            colorPrimary: "#c00000",
                          },
                        },
                        // Specify which payment methods you want to include
                        // payment_method_types: ["card"],
                      }}
                    >
                      <PaymentForm />
                    </Elements>
                  )
                )}
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
          <div className="px-4">
            <h4 class="text-white  text-lg font-semibold">Admin Approval</h4>
            <p class="text-[13px] text-white mt-2">
              Wait for the admin to approve your profile by verifying your
              personal and vehicle information.
            </p>
          </div>
          <div className="mx-4 rounded-2xl p-4 bg-white">
            <h4 class="text-[#c00000]  text-lg font-semibold">
              Buy Subscription
            </h4>
            <p class="text-[13px] text-[#c00000] mt-2">
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

export default AddCard;
