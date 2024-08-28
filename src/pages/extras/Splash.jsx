import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetStarted } from "../../assets/export";
import { Link } from "react-router-dom";
import api from "../../api/apiInterceptor";
import axios from "axios";

const Splash = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();

  const getDriverStatus = async (token, id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`https://backend.faresharellc.com
/driver/status/${id}`);
    if (response?.data?.data?.status == "pending") {
      navigate("/awaiting-approval");
    } else if (
      response?.data?.data?.status == "pending" &&
      response?.data?.data?.isSessionComplete == false
    ) {
      localStorage.setItem("token", token);
      navigate("/complete-profile");
    } else if (
      response?.data?.data?.status == "approved" &&
      response?.data?.data?.isSubscriptionPaid == false
    ) {
      localStorage.setItem("token", token);
      navigate("/add-card");
    } else {
      navigate("/signup");
    }
  };

  useEffect(() => {
    const decodedToken = decodeURIComponent(token);

    if (id && decodedToken) {
      getDriverStatus(decodedToken, id);
    }

    // If you get an id check for subscription status of the driver and save this id for future use
  }, []);
  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div class="w-full h-full  flex flex-col gap-[227px] items-center justify-center animate one text-4xl font-bold text-[#c00000]">
        <img
          src="https://fareshare.vercel.app/assets/fareshare_logo-15fzbzBE.svg"
          alt=""
          className="w-[80%] lg:w-[30%] "
        />

        <Link to="/signup">
          <img src={GetStarted} alt="get_started" />
        </Link>
      </div>
    </div>
  );
};

export default Splash;
