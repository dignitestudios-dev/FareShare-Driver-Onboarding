import React, { useContext, useEffect } from "react";
import {
  FaApple,
  FaArrowLeft,
  FaArrowRight,
  FaFacebook,
  FaFacebookF,
} from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { TiUserAddOutline } from "react-icons/ti";
import { AppContext } from "../../context/AppContext";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import authentication from "../../api/authenticationInterceptor";
import { useState } from "react";
import Error from "../../components/app/global/Error";
import axios from "axios";
import { signupSchema } from "../../schema/signupSchema";
import { signupValues } from "../../data/authentication";
import { Link } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { Card } from "../../assets/export";
import api from "../../api/apiInterceptor";

const AddCard = () => {
  // Load your Stripe public key
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);
  const {
    error,
    setError,
    clientSecret,
    setClientSecret,
    paymentIntent,
    setPaymentIntent,
  } = useContext(AppContext);

  const [secretLoading, setSecretLoading] = useState(false);

  useEffect(() => {
    setSecretLoading(true);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    // Fetch the client secret from your backend
    axios
      .get("https://backend.faresharellc.com/subscription/createStripeSub", {
        headers,
      })
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
        setError(error?.response?.data?.message);
        setSecretLoading(false);
      }); // Adjust according to your response structure
  }, []);

  return (
    <section class="bg-white ">
      <div class="flex justify-center min-h-screen">
        <div class="hidden  h-screen lg:flex justify-center items-center bg-cover  lg:w-2/5">
          <div class="w-full h-full  flex items-center justify-center animate one text-4xl font-bold text-[#c00000]">
            <img
              src="https://fareshare.vercel.app/assets/fareshare_logo-15fzbzBE.svg"
              alt=""
              className="w-[70%]"
            />
          </div>
        </div>

        <div class="flex items-center  w-full max-w-3xl p-6 mx-auto lg:px-12 lg:w-3/5">
          <div class="w-full">
            <Error error={error} setError={setError} />

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
  );
};

export default AddCard;
