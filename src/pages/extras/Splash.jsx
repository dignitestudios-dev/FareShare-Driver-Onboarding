import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetStarted } from "../../assets/export";
import { Link } from "react-router-dom";
import axios from "../../axios";
import Cookies from "js-cookie";
import { ErrorToast } from "../../components/global/Toast";

const Splash = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [loading, setLoading] = useState(false);

  const getDriverStatus = async (token, id) => {
    try {
      setLoading(true);
      const response = await axios.get(`/driver/status/${id}`);
      if (
        response?.data?.data?.status == "pending" &&
        response?.data?.data?.isSessionComplete == true
      ) {
        navigate("/awaiting-approval");
      } else if (
        response?.data?.data?.status == "pending" &&
        response?.data?.data?.isSessionComplete == false
      ) {
        Cookies.set("token", token);
        navigate("/complete-profile");
      } else if (
        response?.data?.data?.status == "approved" &&
        response?.data?.data?.isSubscriptionPaid == false
      ) {
        Cookies.set("token", token);
        navigate("/add-card");
      } else {
        navigate("/signup");
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message || "something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const decodedToken = decodeURIComponent(token);

    if (id && decodedToken) {
      getDriverStatus(decodedToken, id);
    } else {
      navigate("/signup");
    }

    // If you get an id check for subscription status of the driver and save this id for future use
  }, []);
  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div class="w-full h-full  flex flex-col gap-10 items-center justify-center animate one text-4xl font-bold text-[#c00000]">
        <img
          src="https://fareshare.vercel.app/assets/fareshare_logo-15fzbzBE.svg"
          alt=""
          className="w-[60%] lg:w-[30%] "
        />
        {id && token && (
          <span className="text-[14px] font-medium text-gray-700 text-center">
            Fetching your profile progress.
          </span>
        )}

        {loading ? (
          <div
            class="animate-spin inline-block size-10 border-[3px] border-current border-t-transparent text-[#c00000] rounded-full"
            role="status"
            aria-label="loading"
          >
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          <Link to="/signup">
            <img src={GetStarted} alt="get_started" className="w-16" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Splash;
