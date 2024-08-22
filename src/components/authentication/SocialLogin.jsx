import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import app, {
  auth,
  googleProvider,
  appleProvider,
} from "../../firebase/firebase";
import Cookies from "js-cookie";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { Google } from "../../assets/export";
import SocialSignupModal from "./SocialSignupModal";
import authentication from "../../api/authenticationInterceptor";

const SocialLogin = () => {
  const { navigate, error, setError, isSocialLogin, setIsSocialLogin } =
    useContext(AppContext);

  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);

  const handleAppleLogin = async () => {
    try {
      setAppleLoading(true);
      const result = await signInWithPopup(auth, appleProvider);
      if (result) {
        console.log(result);
        const token = await result?.user?.getIdToken();
        if (token) {
          axios
            .post(`https://backend.faresharellc.com/auth/driverSocialSignIn`, {
              email: result?.user?.email,
              idToken: token,
            })
            .then(
              (response) => {
                // just for now
                Cookies.set("token", response?.data?.data?.token, {
                  expires: 7,
                });
                // if (response?.data?.data?.token) {
                //   navigate("/home/");
                // }
              },
              (error) => {
                setError(error?.response?.data?.message);

                // if (error?.response?.data?.message == "No user found") {
                //   axios
                //     .post(`https://backend.faresharellc.com/auth/brokerSocialSignIn`, {
                //       id_token: token,
                //     })
                //     .then(
                //       (response) => {
                //         console.log(response);
                //         if (response?.status == 201) {
                //           axios
                //             .post(`${baseUrl}/login-social`, {
                //               id_token: token,
                //             })
                //             .then(
                //               (response) => {
                //                 // just for now
                //                 Cookies.set(
                //                   "token",
                //                   response?.data?.data?.token,
                //                   { expires: 7 }
                //                 );
                //                 if (response?.data?.data?.token) {
                //                   navigate("/home/");
                //                 }
                //               },
                //               (error) => {
                //                 setAppleLoading(false);
                //                 setFormError(error?.response?.data?.error);
                //                 console.log(error);
                //               }
                //             );
                //           if (response?.data?.data?.token) {
                //             navigate("/home/");
                //           }
                //         }
                //       },
                //       (error) => {
                //         setAppleLoading(false);
                //         setFormError(error?.response?.data?.error);
                //         console.log(error);
                //       }
                //     );
                // }
                // console.log(error);
                setAppleLoading(false);
              }
            );
        }
      }
    } catch (err) {
      setError("Cannot open apple signin modal.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      if (result) {
        // console.log(result);
        const token = await result?.user?.getIdToken();
        if (token) {
          try {
            const email = result?.user?.email;
            const ip = await authentication.get(
              "https://api.ipify.org?format=json"
            );
            const response = await authentication.post(
              "/auth/driverSocialSignup",
              {
                email: email,
                idToken: token,
                ip: ip.data.ip,
              }
            );

            if (response?.data?.success) {
              localStorage.setItem("token", response?.data?.token);
              setIsSocialLogin(true);
              navigate("Complete Profile", "/complete-profile");
            }
          } catch (error) {
            setError(error.response.data.message);
          } finally {
            setGoogleLoading(false);
          }
        }
      }
    } catch (err) {
      setError("Cannot open google signin modal.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div class="w-full grid grid-cols-1 lg:grid-cols-3 gap-3">
      {/* <SocialSignupModal isOpen={openModal} setIsOpen={setOpenModal} /> */}

      <button
        type="button"
        onClick={handleGoogleLogin}
        aria-label="Sign in with Google"
        class="flex items-center justify-center w-full bg-white border border-button-border-light rounded-full p-1 pr-3"
      >
        <div class="flex items-center justify-center bg-white w-9 h-9 rounded-l">
          <img src={Google} className="w-4 " alt="" />
        </div>
        <span class="text-sm text-google-text-gray tracking-wider">
          Continue with Google
        </span>
      </button>
      <button
        type="button"
        aria-label="Sign in with Google"
        class="flex items-center w-full justify-center bg-white border border-button-border-light rounded-full p-1 pr-3"
      >
        <div class="flex items-center text-gray-800 justify-center bg-white w-9 h-9 rounded-l">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 384 512"
            class="text-xl"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
          </svg>
        </div>
        <span class="text-sm text-google-text-gray tracking-wider">
          Continue with Apple
        </span>
      </button>
      <button
        type="button"
        aria-label="Sign in with Facebook"
        class="flex items-center justify-center bg-white border border-button-border-light rounded-full p-1 pr-3"
      >
        <div class="flex items-center justify-center bg-white w-9 h-9 rounded-full">
          <FaFacebookF className="text-xl text-[#1877F2]" />
        </div>
        <span class="text-sm text-google-text-gray tracking-wider">
          Sign in with Facebook
        </span>
      </button>
    </div>
  );
};

export default SocialLogin;
