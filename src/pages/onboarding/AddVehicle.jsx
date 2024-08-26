import React, { useContext, useEffect } from "react";
import {
  FaApple,
  FaArrowLeft,
  FaArrowRight,
  FaFacebook,
  FaFacebookF,
} from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { TiUserAddOutline } from "react-icons/ti";
import { AppContext } from "../../context/AppContext";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import authentication from "../../api/authenticationInterceptor";
import { useState } from "react";
import Error from "../../components/app/global/Error";
import axios from "axios";
import { signupSchema } from "../../schema/signupSchema";
import { signupValues } from "../../data/authentication";
import { Link } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { IoIosArrowRoundForward } from "react-icons/io";
import { addVehicle } from "../../data/profile/addVehicle";
import { vehicleSchema } from "../../schema/profile/addVehicleSchema";
import api from "../../api/apiInterceptor";
import { FaCircleCheck } from "react-icons/fa6";

const AddVehicle = () => {
  const { navigate, error, setError, isUploaded, setIsUploaded, vehicle_id } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const [licenseFront, setLicenseFront] = useState(null);
  const [licenseFrontBase, setLicenseFrontBase] = useState(null);
  const handleLicenseFront = (e) => {
    e.preventDefault();
    document.getElementById("driverLicenseCardFront").click();
  };

  const handleLicenseFrontChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLicenseFrontBase(reader.result);
      };
      reader.readAsDataURL(file);
      setLicenseFront(file);
    }
  };

  const [licenseBack, setLicenseBack] = useState(null);
  const [licenseBackBase, setLicenseBackBase] = useState(null);
  const handleLicenseBack = (e) => {
    e.preventDefault();
    document.getElementById("driverLicenseCardBack").click();
  };

  const handleLicenseBackChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLicenseBackBase(reader.result);
      };
      reader.readAsDataURL(file);
      setLicenseBack(file);
    }
  };

  const [proof, setProof] = useState(null);
  const [proofBase, setProofBase] = useState(null);
  const handleProof = (e) => {
    e.preventDefault();
    document.getElementById("proofInsurance").click();
  };

  const handleProofChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofBase(reader.result);
      };
      reader.readAsDataURL(file);
      setProof(file);
    }
  };

  const [registration, setRegistration] = useState(null);
  const [registrationBase, setRegistrationBase] = useState(null);
  const handleRegistration = (e) => {
    e.preventDefault();
    document.getElementById("vehicleRegistrationCard").click();
  };

  const handleRegistrationChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRegistrationBase(reader.result);
      };
      reader.readAsDataURL(file);
      setRegistration(file);
    }
  };

  const formatDate = (val) => {
    const date = new Date(val);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based in JS
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: addVehicle,
      validationSchema: vehicleSchema,
      validateOnChange: true,
      validateOnBlur: false,

      onSubmit: async (values, action) => {
        setLoading(true);

        try {
          const formdata = new FormData();

          formdata.append("vehicleName", values.vehicleName);
          formdata.append("vehicleMake", values.vehicleMake);
          formdata.append("modelYear", values.modelYear);
          formdata.append("plateNumber", values.plateNumber);
          formdata.append(
            "isWheelChairAccessible",
            values.isWheelChairAccessible
          );
          formdata.append("driverLicenseCardFront", licenseFront);
          formdata.append("driverLicenseCardBack", licenseBack);

          formdata.append(
            "driverLicenseExpiryDate",
            formatDate(values.driverLicenseExpiryDate)
          );
          formdata.append(
            "vehicleRegistrationExpiryDate",
            formatDate(values.vehicleRegistrationExpiryDate)
          );

          formdata.append(
            "proofInsuranceExpiryDate",
            formatDate(values.proofInsuranceExpiryDate)
          );

          formdata.append("proofInsurance", proof);
          formdata.append("vehicleRegistrationCard", registration);
          formdata.append("vehicleId", vehicle_id);

          const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          };
          const response = await axios.post(
            "https://backend.faresharellc.com/driver/completeVehicle",
            formdata,
            { headers }
          );
          if (response?.data?.success) {
            navigate("Awaiting Approval", "/awaiting-approval");
          }
        } catch (error) {
          setError(error?.response?.data?.message);
        } finally {
          setLoading(false);
        }
      },
    });

  return (
    <section class="bg-white ">
      <div class="flex justify-center min-h-screen">
        <div class="hidden  h-screen lg:flex justify-center items-center bg-cover  lg:w-2/5">
          <div class="w-full h-full  flex items-center justify-center animate one text-4xl font-bold text-[#c00000]">
            <img
              src="https://fareshare.vercel.app/assets/fareshare_logo-15fzbzBE.svg"
              alt=""
              className="w-[70%]"
            />
          </div>
        </div>

        <div class="flex items-center  w-full max-w-3xl p-6 mx-auto lg:px-12 lg:w-3/5">
          <div class="w-full">
            <Error error={error} setError={setError} />

            <div className="w-full flex justify-center items-center">
              {/* <Link
                to={"/complete-profile"}
                className="w-10 h-10 mr-auto rounded-full flex justify-center items-center text-md bg-[#c00000] text-white"
              >
                <FaArrowLeft />
              </Link> */}
              <h1 class="text-[17px]  lg:text-[24px] font-semibold text-center tracking-tight text-gray-800 capitalize ">
                Add Vehicle{" "}
              </h1>
            </div>

            <form
              onSubmit={handleSubmit}
              class="w-full flex flex-col gap-6 mt-8 "
            >
              <div className="w-full flex flex-col  gap-4 ">
                <div className="w-full flex flex-col gap-1 justify-center items-center">
                  <button
                    type="button"
                    onClick={() =>
                      navigate("Upload Images", "/upload-vehicle-images")
                    }
                    className="w-full h-[136px] rounded-2xl bg-gray-50 border border-gray-200 text-[#c00000] flex gap-1 flex-col justify-center items-center text-2xl font-medium"
                  >
                    <GoPlus
                      className={`${
                        isUploaded ? "text-green-500" : "text-[#c00000]"
                      }`}
                    />
                    <div className="w-auto flex justify-center items-center gap-1">
                      {isUploaded ? (
                        <>
                          <FaCircleCheck className="text-green-500" />
                          <span className="text-[12px] underline underline-offset-2 font-bold text-green-500">
                            Document Added
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-xs  text-[#000] font-semibold">
                            Upload Vehicle Images
                          </span>
                          <IoIosArrowRoundForward className="text-md text-black" />
                        </>
                      )}
                    </div>
                  </button>
                </div>

                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    Make
                  </label>
                  <input
                    type="text"
                    id="vehicleMake"
                    name="vehicleMake"
                    value={values.vehicleMake}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Toyotta"
                    class={`block w-full px-5 py-3 bg-gray-50  text-gray-700 placeholder-gray-400  border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.vehicleMake && touched.vehicleMake
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.vehicleMake && touched.vehicleMake ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.vehicleMake}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    Model
                  </label>
                  <input
                    type="text"
                    id="vehicleName"
                    name="vehicleName"
                    value={values.vehicleName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="John Doe"
                    class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.vehicleName && touched.vehicleName
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.vehicleName && touched.vehicleName ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.vehicleName}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    Year
                  </label>
                  <input
                    type="text"
                    id="modelYear"
                    name="modelYear"
                    value={values.modelYear}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="2024"
                    class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.modelYear && touched.modelYear
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.modelYear && touched.modelYear ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.modelYear}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    Plate Number
                  </label>
                  <input
                    type="text"
                    id="plateNumber"
                    name="plateNumber"
                    value={values.plateNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="XXX-XXXX"
                    class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.plateNumber && touched.plateNumber
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.plateNumber && touched.plateNumber ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.plateNumber}
                    </p>
                  ) : null}
                </div>

                <div class="flex items-center">
                  <input
                    id="isWheelChairAccessible"
                    type="checkbox"
                    name="isWheelChairAccessible"
                    value={values.isWheelChairAccessible}
                    maxLength={12}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    class="w-3 h-3 text-[#c00000] bg-gray-100 border-gray-300 rounded focus:ring-[#c00000] accent-[#c00000]  focus:ring-2"
                  />
                  <label
                    htmlFor="checked-checkbox"
                    class="ms-2 text-xs my-2 font-medium text-gray-600 "
                  >
                    Is this Wheel Chair Accessible ?
                  </label>
                </div>
                <div className="w-full grid grid-cols-2 gap-2">
                  <div className="w-full h-auto flex flex-col justify-start items-start gap-1">
                    <div className="h-[139px] rounded-2xl border border-gray-200 bg-gray-50 p-3 w-full flex flex-col gap-2 justify-center items-center">
                      <div className="w-full flex items-center justify-center gap-1">
                        <span className="w-6 h-6 rounded-full bg-[#c00000] text-white flex items-center justify-center text-xs">
                          <ImProfile />
                        </span>
                        <span className="text-[13.5px] font-bold text-black">
                          Driver's License
                        </span>
                      </div>
                      <span className="text-[12px] font-[510] text-black">
                        Front
                      </span>

                      <button
                        onClick={handleLicenseFront}
                        className="w-full flex items-center justify-center gap-2 text-black"
                      >
                        {licenseFrontBase ? (
                          <>
                            <FaCircleCheck className="text-green-500" />
                            <span className="text-[12px] underline underline-offset-2 font-bold text-green-500">
                              Document Added
                            </span>
                          </>
                        ) : (
                          <>
                            <AiOutlinePlusCircle />
                            <span className="text-[12px] underline underline-offset-2 font-bold text-black">
                              Add Documents
                            </span>
                          </>
                        )}
                      </button>
                      <input
                        type="file"
                        id="driverLicenseCardFront"
                        name="driverLicenseCardFront"
                        accept="image/*"
                        className="hidden"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleLicenseFrontChange(e);
                          handleChange(e);
                        }}
                      />
                    </div>
                    {errors.driverLicenseCardFront &&
                    touched.driverLicenseCardFront ? (
                      <p className="text-red-700 text-sm ml-1 font-medium">
                        {errors.driverLicenseCardFront}
                      </p>
                    ) : null}
                  </div>
                  <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                    <div className="h-[139px] rounded-2xl border  border-gray-200 bg-gray-50 p-3 w-full flex flex-col gap-2 justify-center items-center">
                      <div className="w-full flex items-center justify-center gap-1">
                        <span className="w-6 h-6 rounded-full bg-[#c00000] text-white flex items-center justify-center text-xs">
                          <ImProfile />
                        </span>
                        <span className="text-[13.5px] font-bold text-black">
                          Driver's License
                        </span>
                      </div>
                      <span className="text-[12px] font-[510] text-black">
                        Back
                      </span>

                      <buttton
                        onClick={handleLicenseBack}
                        className="w-full flex items-center justify-center gap-2 text-black"
                      >
                        {licenseBackBase ? (
                          <>
                            <FaCircleCheck className="text-green-500" />
                            <span className="text-[12px] underline underline-offset-2 font-bold text-green-500">
                              Document Added
                            </span>
                          </>
                        ) : (
                          <>
                            <AiOutlinePlusCircle />
                            <span className="text-[12px] underline underline-offset-2 font-bold text-black">
                              Add Documents
                            </span>
                          </>
                        )}
                      </buttton>
                      <input
                        type="file"
                        id="driverLicenseCardBack"
                        name="driverLicenseCardBack"
                        accept="image/*"
                        className="hidden"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleLicenseBackChange(e);
                          handleChange(e);
                        }}
                      />
                    </div>
                    {errors.driverLicenseCardBack &&
                    touched.driverLicenseCardBack ? (
                      <p className="text-red-700 text-sm ml-1 font-medium">
                        {errors.driverLicenseCardBack}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    id="driverLicenseExpiryDate"
                    name="driverLicenseExpiryDate"
                    value={values.driverLicenseExpiryDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="johnsnow@example.com"
                    class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.driverLicenseExpiryDate &&
                      touched.driverLicenseExpiryDate
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.driverLicenseExpiryDate &&
                  touched.driverLicenseExpiryDate ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.driverLicenseExpiryDate}
                    </p>
                  ) : null}
                </div>
                <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                  <div className="h-[139px] bg-gray-50 rounded-2xl border border-gray-200 p-3 w-full flex flex-col gap-2 justify-center items-center">
                    <div className="w-full flex items-center justify-center gap-1">
                      <span className="w-6 h-6 rounded-full bg-[#c00000] text-white flex items-center justify-center text-xs">
                        <ImProfile />
                      </span>
                      <span className="text-[13.5px] font-bold text-black">
                        Proof Insurance
                      </span>
                    </div>
                    <span className="text-[12px] font-[510] text-black">
                      Upload proof insurance
                    </span>

                    <button
                      onClick={handleProof}
                      className="w-full flex items-center justify-center gap-2 text-black"
                    >
                      {proofBase ? (
                        <>
                          <FaCircleCheck className="text-green-500" />
                          <span className="text-[12px] underline underline-offset-2 font-bold text-green-500">
                            Document Added
                          </span>
                        </>
                      ) : (
                        <>
                          <AiOutlinePlusCircle />
                          <span className="text-[12px] underline underline-offset-2 font-bold text-black">
                            Add Documents
                          </span>
                        </>
                      )}
                    </button>
                    <input
                      type="file"
                      id="proofInsurance"
                      name="proofInsurance"
                      accept="image/*"
                      className="hidden"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleProofChange(e);
                        handleChange(e);
                      }}
                    />
                  </div>
                  {errors.proofInsurance && touched.proofInsurance ? (
                    <p className="text-red-700 text-sm ml-1 font-medium">
                      {errors.proofInsurance}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    id="proofInsuranceExpiryDate"
                    name="proofInsuranceExpiryDate"
                    value={values.proofInsuranceExpiryDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="johnsnow@example.com"
                    class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.proofInsuranceExpiryDate &&
                      touched.proofInsuranceExpiryDate
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.proofInsuranceExpiryDate &&
                  touched.proofInsuranceExpiryDate ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.proofInsuranceExpiryDate}
                    </p>
                  ) : null}
                </div>
                <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                  <div className="h-[139px] rounded-2xl bg-gray-50 border border-gray-200 p-3 w-full flex flex-col gap-2 justify-center items-center">
                    <div className="w-full flex items-center justify-center gap-1">
                      <span className="w-6 h-6 rounded-full bg-[#c00000] text-white flex items-center justify-center text-xs">
                        <ImProfile />
                      </span>
                      <span className="text-[13.5px] font-bold text-black">
                        Registration
                      </span>
                    </div>
                    <span className="text-[12px] font-[510] text-black">
                      Upload proof of vehicle’s registrations
                    </span>

                    <button
                      onClick={handleRegistration}
                      className="w-full flex items-center justify-center gap-2 text-black"
                    >
                      {registration ? (
                        <>
                          <FaCircleCheck className="text-green-500" />
                          <span className="text-[12px] underline underline-offset-2 font-bold text-green-500">
                            Document Added
                          </span>
                        </>
                      ) : (
                        <>
                          <AiOutlinePlusCircle />
                          <span className="text-[12px] underline underline-offset-2 font-bold text-black">
                            Add Documents
                          </span>
                        </>
                      )}
                    </button>

                    <input
                      type="file"
                      id="vehicleRegistrationCard"
                      name="vehicleRegistrationCard"
                      accept="image/*"
                      className="hidden"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleRegistrationChange(e);
                        handleChange(e);
                      }}
                    />
                  </div>
                  {errors.vehicleRegistrationCard &&
                  touched.vehicleRegistrationCard ? (
                    <p className="text-red-700 text-sm ml-1 font-medium">
                      {errors.vehicleRegistrationCard}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    id="vehicleRegistrationExpiryDate"
                    name="vehicleRegistrationExpiryDate"
                    value={values.vehicleRegistrationExpiryDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="johnsnow@example.com"
                    class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.vehicleRegistrationExpiryDate &&
                      touched.vehicleRegistrationExpiryDate
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.vehicleRegistrationExpiryDate &&
                  touched.vehicleRegistrationExpiryDate ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.vehicleRegistrationExpiryDate}
                    </p>
                  ) : null}
                </div>
              </div>

              <button
                type="submit"
                // disabled={loading}
                class="flex items-center justify-center gap-4 w-full  px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#c00000] rounded-full hover:bg-[#c00000] focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50"
              >
                {loading && (
                  <div
                    class="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                    role="status"
                    aria-label="loading"
                  >
                    <span class="sr-only">Loading...</span>
                  </div>
                )}
                <span>Confirm & Send for Approval </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 rtl:-scale-x-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddVehicle;
