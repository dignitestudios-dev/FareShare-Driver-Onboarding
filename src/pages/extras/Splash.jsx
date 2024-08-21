import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetStarted } from "../../assets/export";
import { Link } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();

  useEffect(() => {
    console.log(id);
    const decodedToken = decodeURIComponent(token);
    const encodedToken = encodeURIComponent(token);

    console.log("Token", token);
    console.log(decodedToken);
    console.log("Encoded", encodedToken);
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
