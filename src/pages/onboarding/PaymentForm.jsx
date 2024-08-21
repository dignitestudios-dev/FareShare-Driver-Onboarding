import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      setIsLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        // Add any additional billing details here (optional)
      },
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      console.log("PaymentMethod ID:", paymentMethod.id);
      // Send paymentMethod.id to your backend to create a PaymentIntent or confirm a payment
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="text-xs font-semibold text-gray-600">
          Card Number
        </label>
        <CardNumberElement
          className="w-full bg-gray-50 border border-gray-200 h-12 rounded-xl px-3 py-3"
          options={{
            style: {
              base: {
                backgroundColor: "#F9FAFB",
                color: "#424770",
                fontFamily: "Source Code Pro, monospace",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-600">
          Expiration Date
        </label>

        <CardExpiryElement
          className="w-full bg-gray-50 border border-gray-200 h-12 rounded-xl px-3 py-3"
          options={{
            style: {
              base: {
                backgroundColor: "#F9FAFB",

                color: "#424770",
                fontFamily: "Source Code Pro, monospace",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-600">CVC</label>
        <CardCvcElement
          className="w-full bg-gray-50 border border-gray-200 h-12 rounded-xl px-3 py-3"
          options={{
            style: {
              base: {
                backgroundColor: "#F9FAFB",

                color: "#424770",
                fontFamily: "Source Code Pro, monospace",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-600 ">ZIP Code</label>
        <input
          type="text"
          placeholder="12345"
          maxLength={5}
          className="w-full border bg-gray-50 text-[#424770] text-sm outline-none placeholder:text-[#aab7c4] border-gray-200 h-12 rounded-xl px-3 "
        />
        {/* Optional: You can also use Stripe's PostalCodeElement for ZIP Code */}
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}
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
