import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import app, {
  auth,
  googleProvider,
  appleProvider,
} from "../../firebase/firebase";
import Cookies from "js-cookie";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { Google } from "../../assets/export";
import SocialSignupModal from "./SocialSignupModal";
import axios from "../../axios";
import { ErrorToast } from "../global/Toast";

const SocialLogin = () => {
  const navigate = useNavigate();
  const { isSocialLogin, setIsSocialLogin } = useContext(AppContext);

  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);

  const handleFacebookLogin = async () => {
    try {
      setFacebookLoading(true);
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result) {
        const token = await result?.user?.getIdToken();
        if (token) {
          try {
            const email = result?.user?.email;
            let res = await fetch("https://api.ipify.org?format=json", {
              method: "GET",
            });
            const ip = await res.json();
            const response = await axios.post("/auth/driverSocialSignup", {
              email: email,
              idToken: token,
              ip: ip?.ip,
            });

            if (response?.data?.success) {
              Cookies.set("token", response?.data?.token);
              setIsSocialLogin(true);
              localStorage.setItem("isSocial", "yes");
              navigate("/complete-profile");
            }
          } catch (error) {
            setFacebookLoading(false);
            ErrorToast(error.response.data.message || "Something went wrong.");
          } finally {
            setFacebookLoading(false);
          }
        }
      }
    } catch (err) {
      console.log(err);
      ErrorToast("Cannot open facebook signin modal.");
    } finally {
      setFacebookLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    try {
      setAppleLoading(true);
      const result = await signInWithPopup(auth, appleProvider);
      const credential = OAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      if (result) {
        const token = await result?.user?.getIdToken();
        if (token) {
          try {
            const email = result?.user?.email;
            let res = await fetch("https://api.ipify.org?format=json", {
              method: "GET",
            });
            const ip = await res.json();
            const response = await axios.post("/auth/driverSocialSignup", {
              email: email,
              idToken: token,
              ip: ip?.ip,
            });

            if (response?.data?.success) {
              Cookies.set("token", response?.data?.token);
              setIsSocialLogin(true);
              localStorage.setItem("isSocial", "yes");
              navigate("/complete-profile");
            }
          } catch (error) {
            setAppleLoading(false);
            ErrorToast(error.response.data.message || "Something went wrong.");
          } finally {
            setAppleLoading(false);
          }
        }
      }
    } catch (err) {
      console.log(err);

      setAppleLoading(false);

      ErrorToast("Cannot open apple signin modal.");
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
            let res = await fetch("https://api.ipify.org?format=json", {
              method: "GET",
            });
            const ip = await res.json();
            const response = await axios.post("/auth/driverSocialSignup", {
              email: email,
              idToken: token,
              ip: ip?.ip,
            });

            if (response?.data?.success) {
              Cookies.set("token", response?.data?.token);
              setIsSocialLogin(true);
              localStorage.setItem("isSocial", "yes");
              navigate("/complete-profile");
            }
          } catch (error) {
            setGoogleLoading(false);
            ErrorToast(error.response.data.message || "Something went wrong.");
          } finally {
            setGoogleLoading(false);
          }
        }
      }
    } catch (err) {
      setGoogleLoading(false);
      ErrorToast("Cannot open google signin modal.");
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
        class="flex items-center justify-center w-full h-12 bg-white border hover:bg-gray-50 border-button-border-light rounded-lg p-1 pr-3"
      >
        {googleLoading ? (
          <div
            class="animate-spin inline-block size-4 border-[3px] mr-1 border-current border-t-transparent text-[#EA4335] rounded-lg"
            role="status"
            aria-label="loading"
          >
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          <div class="flex items-center justify-center bg-white w-9 h-9 rounded-l">
            <img src={Google} className="w-4 " alt="" />
          </div>
        )}
        <span class="text-xs text-google-text-gray tracking-wider">
          Continue with Google
        </span>
      </button>
      <button
        type="button"
        onClick={handleAppleLogin}
        aria-label="Sign in with Google"
        class="flex items-center w-full justify-center h-12 bg-white border hover:bg-gray-50 border-button-border-light rounded-lg p-1 pr-3"
      >
        {appleLoading ? (
          <div
            class="animate-spin inline-block size-4 border-[3px] mr-1 border-current border-t-transparent text-[#000] rounded-lg"
            role="status"
            aria-label="loading"
          >
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
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
        )}

        <span class="text-xs text-google-text-gray tracking-wider">
          Continue with Apple
        </span>
      </button>
      <button
        type="button"
        onClick={handleFacebookLogin}
        aria-label="Sign in with Facebook"
        class="flex items-center justify-center h-12 bg-white border hover:bg-gray-50 border-button-border-light rounded-lg p-1 pr-3"
      >
        {facebookLoading ? (
          <div
            class="animate-spin inline-block size-4 border-[3px] mr-1 border-current border-t-transparent text-[#1877F2] rounded-lg"
            role="status"
            aria-label="loading"
          >
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          <div class="flex items-center justify-center bg-white w-9 h-9 rounded-lg">
            <FaFacebookF className="text-xl text-[#1877F2]" />
          </div>
        )}

        <span class="text-xs text-google-text-gray tracking-wider">
          Sign in with Facebook
        </span>
      </button>
    </div>
  );
};

export default SocialLogin;
