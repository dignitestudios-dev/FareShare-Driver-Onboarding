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

const AddCard = () => {
  const { navigate, error, setError } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: signupValues,
      validationSchema: signupSchema,
      validateOnChange: true,
      validateOnBlur: false,

      onSubmit: async (values, action) => {
        setLoading(true);
        // try {
        //   // API call to login using Axios interceptor
        //   const response = await authentication.post("/auth/brokerSignIn", {
        //     email: values.email,
        //     password: values.password,
        //   });

        //   if (response?.status == 200 && response?.data?.token !== null) {
        //     localStorage.setItem("token", response?.data?.token);
        //     localStorage.setItem(
        //       "broker",
        //       JSON.stringify(response?.data?.data)
        //     );
        //     navigate("Home", "/home");
        //   }
        // } catch (error) {
        //   console.log(error);
        //   // Handle errors (e.g., show error message)
        //   setError(error?.response?.data?.message);
        // } finally {
        //   // console.error("Login failed:", error.response?.data);
        //   setLoading(false);
        // }
        setTimeout(() => {
          navigate("Verify Email Otp", "verify-otp-email");
          setLoading(false);
        }, 2000);
      },
    });

  // Load your Stripe public key
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

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
              <Link
                to={"/add-card"}
                className="w-10 h-10 mr-auto rounded-full flex justify-center items-center text-md bg-[#c00000] text-white"
              >
                <FaArrowLeft />
              </Link>
              <h1 class="text-[17px] mr-auto lg:text-[24px] font-semibold text-center tracking-tight text-gray-800 capitalize ">
                Card details{" "}
              </h1>
            </div>
            <div className="w-full flex justify-center items-center my-6">
              <img src={Card} alt="" />
            </div>

            {
              <Elements stripe={stripePromise}>
                <PaymentForm />
              </Elements>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddCard;
