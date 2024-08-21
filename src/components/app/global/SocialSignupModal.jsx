import React from "react";

const SocialSignupModal = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`w-screen h-screen ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center `}
    >
      <div className="w-[650px] h-[800px] rounded-xl bg-white p-2 flex justify-center items-center"></div>
    </div>
  );
};

export default SocialSignupModal;
