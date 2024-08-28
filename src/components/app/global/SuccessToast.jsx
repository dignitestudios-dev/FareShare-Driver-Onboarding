import React, { useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const SuccessToast = ({ success, setSuccess }) => {
  useEffect(() => {
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  }, [success]);

  return (
    <div
      class={`max-w-xs z-50 transition-all duration-500 fixed bottom-4 right-3 bg-white ${
        success ? "translate-x-0" : "translate-x-96"
      } border border-gray-200 rounded-xl shadow-lg  `}
      role="alert"
      tabindex="-1"
      aria-labelledby="hs-toast-stack-toggle-label"
    >
      <div class="flex p-4">
        <div class="shrink-0">
          <FaCircleCheck className="text-green-600 text-md" />
        </div>
        <div class="ms-3">
          <p id="hs-toast-success-example-label" class="text-sm text-gray-700 ">
            {success}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessToast;
