import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../../context/AppContext";
import { useFormik } from "formik";
import axios from "../../axios";
import { ImProfile } from "react-icons/im";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { addVehicle } from "../../data/profile/addVehicle";
import { vehicleSchema } from "../../schema/profile/addVehicleSchema";
import { FaCircleCheck } from "react-icons/fa6";
import { ErrorToast, SuccessToast } from "../../components/global/Toast";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { IoCarSportOutline } from "react-icons/io5";
import Cookies from "js-cookie";

const AddVehicle = () => {
  const navigate = useNavigate();
  const { isUploaded, setIsUploaded, vehicle_id } = useContext(AppContext);
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
          formdata.append("vehicleId", localStorage.getItem("vehicle_id"));

          const response = await axios.post(
            "/driver/completeVehicle",
            formdata
          );
          if (response?.data?.success) {
            SuccessToast("Profile & Vehicle sent for approval.");
            navigate("/awaiting-approval");
          }
        } catch (error) {
          ErrorToast(error?.response?.data?.message || "Something went wrong.");
        } finally {
          setLoading(false);
        }
      },
    });

  function getSixMonthsFromToday() {
    const today = new Date();
    today.setMonth(today.getMonth() + 6);
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    const token = Cookies.get("token");
    const vehicleId = localStorage.getItem("vehicle_id");
    if (token && vehicleId) {
      return;
    } else if (!vehicleId) {
      ErrorToast("Vehicle Id not found. Please re-signup.");
      navigate("/signup");
    } else if (token == null) {
      ErrorToast("Session expired, Please relogin");
      navigate("/signup");
    } else {
      return;
    }
  }, []);

  return (
    <div class="w-full  bg-white">
      <div class="grid lg:grid-cols-4 md:grid-cols-3 items-center">
        <section class="lg:col-span-3 md:col-span-2 max-w-2xl w-full lg:p-6 mx-auto ">
          <div class="flex justify-center w-full min-h-screen">
            <div class="flex items-center  w-full  p-6 lg:px-12">
              <div class="w-full">
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
                    {/* <div className="w-full flex flex-col gap-1 justify-center items-center">
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
                </div> */}
                    <div className="w-full grid grid-cols-2 gap-2">
                      <div>
                        <div class="relative flex items-center">
                          <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                            Make
                          </label>
                          <input
                            type="text"
                            id="vehicleMake"
                            name="vehicleMake"
                            placeholder="e.g. Toyota"
                            value={values.vehicleMake}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                          />

                          <span className="absolute right-4 text-xl text-gray-400">
                            <IoCarSportOutline />{" "}
                          </span>
                        </div>
                        {errors.vehicleMake && touched.vehicleMake ? (
                          <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                            {errors.vehicleMake}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <div class="relative flex items-center">
                          <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                            Model
                          </label>
                          <input
                            type="text"
                            id="vehicleName"
                            name="vehicleName"
                            placeholder="e.g. Corolla"
                            value={values.vehicleName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                          />

                          <span className="absolute right-4 text-xl text-gray-400">
                            <IoCarSportOutline />{" "}
                          </span>
                        </div>
                        {errors.vehicleName && touched.vehicleName ? (
                          <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                            {errors.vehicleName}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="w-full grid grid-cols-2 gap-2">
                      <div>
                        <div class="relative flex items-center">
                          <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                            Year
                          </label>
                          <input
                            type="text"
                            id="modelYear"
                            name="modelYear"
                            placeholder="XXXX"
                            value={values.modelYear}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                          />

                          <span className="absolute right-4 text-xl text-gray-400">
                            <IoCarSportOutline />{" "}
                          </span>
                        </div>
                        {errors.modelYear && touched.modelYear ? (
                          <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                            {errors.modelYear}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <div class="relative flex items-center">
                          <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                            Plate Number
                          </label>
                          <input
                            type="text"
                            id="plateNumber"
                            name="plateNumber"
                            placeholder="XYZ-0000"
                            value={values.plateNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                          />

                          <span className="absolute right-4 text-xl text-gray-400">
                            <IoCarSportOutline />{" "}
                          </span>
                        </div>
                        {errors.plateNumber && touched.plateNumber ? (
                          <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                            {errors.plateNumber}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div class="flex my-2 items-center">
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
                        class="ms-2 text-xs leading-none font-medium text-gray-600 "
                      >
                        Is this Wheel Chair Accessible ?
                      </label>
                    </div>
                    <div className="w-full grid grid-cols-2 gap-2">
                      <div className="w-full h-auto flex flex-col justify-start items-start gap-1">
                        <div className="h-[139px] rounded-lg border-2 border-gray-200 bg-white p-3 w-full flex flex-col gap-2 justify-center items-center relative">
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
                          {licenseFrontBase && (
                            <button
                              type="button"
                              onClick={() => {
                                setLicenseFront(null);
                                setLicenseFrontBase(null);
                                values.driverLicenseCardFront = null;
                              }}
                              className="absolute top-2 w-6 h-6  flex justify-center items-center right-2 p-2 bg-red-500 text-white rounded-full"
                              aria-label="Remove image"
                            >
                              <IoMdClose />
                            </button>
                          )}

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
                        <div className="h-[139px] relative rounded-lg border-2  border-gray-200 bg-white p-3 w-full flex flex-col gap-2 justify-center items-center">
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
                          {licenseBackBase && (
                            <button
                              type="button"
                              onClick={() => {
                                setLicenseBack(null);
                                setLicenseBackBase(null);
                                values.driverLicenseCardBack = null;
                              }}
                              className="absolute top-2 w-6 h-6  flex justify-center items-center right-2 p-2 bg-red-500 text-white rounded-full"
                              aria-label="Remove image"
                            >
                              <IoMdClose />
                            </button>
                          )}
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
                                <span className="text-[12px]  cursor-pointer underline underline-offset-2 font-bold text-black">
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
                      <div class="relative flex items-center">
                        <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                          Expiration Date
                        </label>
                        <input
                          type="date"
                          id="driverLicenseExpiryDate"
                          name="driverLicenseExpiryDate"
                          min={getSixMonthsFromToday()}
                          placeholder="e.g. Toyota"
                          value={values.driverLicenseExpiryDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                        />
                      </div>
                      {errors.driverLicenseExpiryDate &&
                      touched.driverLicenseExpiryDate ? (
                        <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                          {errors.driverLicenseExpiryDate}
                        </p>
                      ) : null}
                      <p className="text-gray-800 mt-1 w-full flex justify-end text-[10px]">
                        ( You can only select a date that is 6 months ahead. )
                      </p>
                    </div>

                    <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                      <div className="h-[139px] w-full relative bg-white rounded-lg border-2 border-gray-200 p-3white flex flex-col gap-2 justify-center items-center">
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
                        {proofBase && (
                          <button
                            type="button"
                            onClick={() => {
                              setProof(null);
                              setProofBase(null);
                              values.proofInsurance = null;
                            }}
                            className="absolute top-2 w-6 h-6  flex justify-center items-center right-2 p-2 bg-red-500 text-white rounded-full"
                            aria-label="Remove image"
                          >
                            <IoMdClose />
                          </button>
                        )}
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
                      <div class="relative flex items-center">
                        <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                          Expiration Date
                        </label>
                        <input
                          type="date"
                          id="proofInsuranceExpiryDate"
                          name="proofInsuranceExpiryDate"
                          min={getSixMonthsFromToday()}
                          placeholder="e.g. Toyota"
                          value={values.proofInsuranceExpiryDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                        />
                      </div>
                      {errors.proofInsuranceExpiryDate &&
                      touched.proofInsuranceExpiryDate ? (
                        <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                          {errors.proofInsuranceExpiryDate}
                        </p>
                      ) : null}
                      <p className="text-gray-800 mt-1 w-full flex justify-end text-[10px]">
                        ( You can only select a date that is 6 months ahead. )
                      </p>
                    </div>
                    <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                      <div className="h-[139px] relative rounded-lg bg-white border-2 border-gray-200 p-3 w-full flex flex-col gap-2 justify-center items-center">
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
                        {registrationBase && (
                          <button
                            type="button"
                            onClick={() => {
                              setRegistration(null);
                              setRegistrationBase(null);
                              values.vehicleRegistrationCard = null;
                            }}
                            className="absolute top-2 w-6 h-6  flex justify-center items-center right-2 p-2 bg-red-500 text-white rounded-full"
                            aria-label="Remove image"
                          >
                            <IoMdClose />
                          </button>
                        )}

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
                      <div class="relative flex items-center">
                        <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                          Expiration Date
                        </label>
                        <input
                          type="date"
                          id="vehicleRegistrationExpiryDate"
                          name="vehicleRegistrationExpiryDate"
                          min={getSixMonthsFromToday()}
                          placeholder="e.g. Toyota"
                          value={values.vehicleRegistrationExpiryDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                        />
                      </div>
                      {errors.vehicleRegistrationExpiryDate &&
                      touched.vehicleRegistrationExpiryDate ? (
                        <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                          {errors.vehicleRegistrationExpiryDate}
                        </p>
                      ) : null}
                      <p className="text-gray-800 mt-1 w-full flex justify-end text-[10px]">
                        ( You can only select a date that is 6 months ahead. )
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
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
        <div class="flex flex-col justify-center space-y-16 md:h-screen max-md:mt-16 min-h-full bg  py-4">
          <div className="px-4">
            <h4 class="text-white text-lg font-semibold">Sign up</h4>
            <p class="text-[13px] text-white mt-2">
              Register yourself by filling out your account specific data.
            </p>
          </div>

          <div className=" px-4 ">
            <h4 class="text-white  text-lg font-semibold">Complete Profile</h4>
            <p class="text-[13px] text-white mt-2">
              Complete your profile by providing your personal details for your
              account.
            </p>
          </div>
          <div className=" mx-4 rounded-2xl p-4 bg-white">
            <h4 class="text-[#c00000]  text-lg font-semibold">Add Vehicle</h4>
            <p class="text-[13px] text-[#c00000] mt-2">
              Add your primary vehicle images, and documentation to access
              seamless driving experience.
            </p>
          </div>
          <div className="px-4">
            <h4 class="text-white  text-lg font-semibold">Admin Approval</h4>
            <p class="text-[13px] text-white mt-2">
              Wait for the admin to approve your profile by verifying your
              personal and vehicle information.
            </p>
          </div>
          <div className="px-4">
            <h4 class="text-white  text-lg font-semibold">Buy Subscription</h4>
            <p class="text-[13px] text-white mt-2">
              Attach your card and buy a weekly subscription to access the
              features of the platform.
            </p>
          </div>

          <div className="px-4">
            <h4 class="text-white  text-lg font-semibold">Add Bank</h4>
            <p class="text-[13px] text-white mt-2">
              Add your bank account details for future funds and your rides
              payment recieving.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;
