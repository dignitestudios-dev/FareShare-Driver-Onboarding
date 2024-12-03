import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../assets/export";
import Cookies from "js-cookie";
import { verifyOtpValues } from "../../data/authentication";
import { verifyOtpSchema } from "../../schema/verifyOtpSchema";
import { useFormik } from "formik";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toast";

const VerifyOtpEmail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: verifyOtpValues,
      validationSchema: verifyOtpSchema,
      validateOnChange: true,
      validateOnBlur: false,

      onSubmit: async (values, action) => {
        setLoading(true);
        try {
          const response = await axios.post(`/auth/validateOTP`, {
            code: values?.otp.toString(),
            email: localStorage.getItem("email"),
          });
          if (response?.status === 200) {
            Cookies.set("token", response?.data?.token);
            const headers = {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            };

            axios
              .post(
                "/auth/sendPhoneOTP",
                {
                  phoneNo: localStorage.getItem("phone"),
                },
                { headers }
              )
              .then((response) => {
                if (response?.data?.success) {
                  SuccessToast("Email OTP Verified Successfully.");
                  navigate("/verify-otp-phone");
                  setLoading(false);
                }
              })
              .catch((error) => {
                ErrorToast(
                  error?.response?.data?.message ||
                    "Invalid Phone number provided. Please resignup."
                );
                Cookies.remove("token");
                navigate("/signup");
              });
          }
        } catch (error) {
          setLoading(false);
          ErrorToast(error?.response?.data?.message || "Something went wrong");
        } finally {
          setLoading(false);
        }
      },
    });

  const [resend, setResend] = useState(false);
  const resentOTP = async (e) => {
    e.preventDefault();
    try {
      setResend(true);
      const response = await axios.post("/auth/sendOTP", {
        email: localStorage.getItem("email"),
      });
      if (response?.status === 201) {
        setResend(false);
        SuccessToast("Email Resent Sent Successfully.");
      }
    } catch (error) {
      setResend(false);
      ErrorToast(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      navigate("/signup");
    } else {
      return;
    }
  }, []);
  return (
    <div class="w-full  bg-white">
      <div class="grid lg:grid-cols-4 md:grid-cols-3 items-center">
        <form
          onSubmit={handleSubmit}
          class="lg:col-span-3 md:col-span-2 max-w-lg w-full p-6 mx-auto"
        >
          <div class="mb-12">
            <img src={Logo} alt="" className="mb-10 scale-110" />

            <h3 class="text-gray-800 text-4xl font-extrabold">
              Verify Email OTP !
            </h3>
            <p class="text-gray-800 text-sm mt-6 leading-relaxed">
              Please provide the 4 digit otp code that you've recieved on{" "}
              <span className="text-[#c00000] font-medium">
                {localStorage.getItem("email")}
              </span>
              .
            </p>
          </div>

          <div>
            <div class="relative flex items-center">
              <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                OTP
              </label>
              <input
                type="number"
                id="otp"
                name="otp"
                value={values.otp}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter 4 digit OTP Code"
                class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
              />
              <button
                type="button"
                disabled={resend}
                onClick={resentOTP}
                className="absolute right-2 w-16 py-2 rounded-md px-2 bg-[#c00000] text-white text-sm font-medium flex items-center justify-center"
              >
                {resend ? (
                  <div
                    class="animate-spin inline-block size-3 border-[3px] border-current border-t-transparent text-white rounded-full"
                    role="status"
                    aria-label="loading"
                  >
                    <span class="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Resend"
                )}
              </button>
            </div>
            {errors.otp && touched.otp ? (
              <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                {errors.otp}
              </p>
            ) : null}
          </div>

          <div class="mt-12">
            <button
              type="submit"
              disabled={loading}
              class="w-full shadow-xl py-2.5 px-4 text-sm tracking-wider font-semibold rounded-full text-white button-bg  focus:outline-none"
            >
              Continue
              <span className="ml-2">
                {loading && (
                  <div
                    class="animate-spin inline-block size-3 border-[3px] border-current border-t-transparent text-white rounded-full"
                    role="status"
                    aria-label="loading"
                  >
                    <span class="sr-only">Loading...</span>
                  </div>
                )}
              </span>
            </button>
          </div>
        </form>

        <div class="flex flex-col justify-center space-y-16 md:h-screen max-md:mt-16 px-4 min-h-full bg lg:px-8  ">
          <div className="px-4 bg-white rounded-2xl p-4">
            <h4 class="text-[#c00000] text-lg font-semibold">
              Verify Email OTP
            </h4>
            <p class="text-[13px] text-[#c00000] mt-2">
              Provide the OTP that you've recieved on your email to verify your
              email.
            </p>
          </div>
          <div className="px-4">
            <h4 class="text-white text-lg font-semibold">Get Phone OTP</h4>
            <p class="text-[13px] text-white mt-2">
              After successfull verification of email you'll automatically get
              an OTP on your phone number.
            </p>
          </div>
          <div className="px-4">
            <h4 class="text-white text-lg font-semibold">verify Phone OTP</h4>
            <p class="text-[13px] text-white mt-2">
              Provide the OTP that you've recieved on your phone number to
              continue the signup process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpEmail;
