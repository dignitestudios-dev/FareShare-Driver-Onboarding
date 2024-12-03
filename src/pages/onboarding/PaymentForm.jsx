import React, { useContext, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { AppContext } from "../../context/AppContext";
import { ErrorToast } from "../../components/global/Toast";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { paymentIntentId } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }
    try {
      const paymentResult = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `${window.location.origin}/success`,
        },
      });

      const paymentIntentId = paymentResult.paymentIntent.id;
      window.localStorage.setItem("paymentIntent", paymentIntentId);

      // Extract Subscription ID if it's a subscription payment
      const subscriptionId =
        paymentResult.paymentIntent.metadata.subscription_id;
      window.localStorage.setItem("subscriptionId", paymentIntentId);
      console.log(subscriptionId);

      if (
        paymentResult.error.type === "card_error" ||
        paymentResult.error.type === "validation_error"
      ) {
        ErrorToast(paymentResult?.error?.message || "Something went wrong.");
        setIsLoading(false);
      } else {
        setIsLoading(false);

        ErrorToast("An unexpected error occured.");
      }
    } catch (error) {
      ErrorToast("Invalid or No Data Provided.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      {/* {error && <div style={{ color: "red" }}>{error}</div>} */}
      <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        className="flex items-center mt-4 justify-center gap-4 w-full  px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#c00000] rounded-full hover:bg-[#c00000] focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50"
      >
        {isLoading && (
          <div
            className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        )}
        <span>Confirm & Continue</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 rtl:-scale-x-100"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
};

export default PaymentForm;
