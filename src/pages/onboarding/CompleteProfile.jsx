import React, { useContext, useEffect, useRef } from "react";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "../../axios";
import { FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { AppContext } from "../../context/AppContext";
import { ErrorToast, SuccessToast } from "../../components/global/Toast";
import { HiOutlineMapPin } from "react-icons/hi2";
import { data } from "../../constants/cities";
import { completeProfileValues } from "../../data/profile/completeProfile";
import { completeProfileSchema } from "../../schema/profile/completeProfileSchema";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const { isSocialLogin } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profileBase, setProfileBase] = useState(null);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [referal, setReferal] = useState("");
  const [referalError, setReferalError] = useState(false);

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileBase(reader.result);
      };
      reader.readAsDataURL(file);
      setProfilePicture(file);
    }
  };
  const [social, setSocial] = useState(null);
  const [socialBase, setSocialBase] = useState(null);
  const handleSocialFrontClick = (e) => {
    e.preventDefault();
    document.getElementById("socialSecurityCardFront").click();
  };

  const handleSocialFrontChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSocialBase(reader.result);
      };
      reader.readAsDataURL(file);
      setSocial(file);
    }
  };

  const [socialBack, setSocialBack] = useState(null);
  const [socialBackBase, setSocialBackBase] = useState(null);
  const handleSocialBackClick = (e) => {
    e.preventDefault();
    document.getElementById("socialSecurityCardBack").click();
  };

  const handleSocialBackChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSocialBackBase(reader.result);
      };
      reader.readAsDataURL(file);
      setSocialBack(file);
    }
  };

  const buttonRef = useRef();

  const handleProfileClick = (e) => {
    document.getElementById("profilePicture").click();
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: completeProfileValues,
      validationSchema: completeProfileSchema,
      validateOnChange: true,
      validateOnBlur: false,

      onSubmit: async (values, action) => {
        setLoading(true);
        if (isSocialLogin && phone == "") {
          setPhoneError("Please provide a valid phone number.");
          setLoading(false);
        } else {
          const formdata = new FormData();
          formdata.append("firstName", values.firstName);
          formdata.append("lastName", values.lastName);
          values?.suffix !== "" && formdata.append("suffix", values.suffix);
          values?.MI !== "" && formdata.append("MI", values.MI);
          formdata.append("dateOfBirth", values.dateOfBirth);
          formdata.append("gender", values.gender);
          formdata.append("SSN", values.SSN);
          formdata.append("driverLicenseNumber", values.driverLicenseNumber);
          isSocialLogin && formdata.append("phoneNo", phone);
          isSocialLogin &&
            referal !== "" &&
            formdata.append("referalCode", referal);
          formdata.append("street", values.street);
          formdata.append("city", values.city);
          formdata.append("state", values.state);
          formdata.append("zipcode", values.zipCode);
          formdata.append("profilePicture", profilePicture);
          formdata.append("socialSecurityCardFront", social);
          formdata.append("socialSecurityCardBack", socialBack);

          try {
            const response = await axios.post(
              "/driver/completeProfile",
              formdata
            );
            if (response.data.success) {
              SuccessToast("Personal Profile Completed Successfully.");
              isSocialLogin && localStorage.setItem("phone", phone);
              isSocialLogin
                ? navigate("/verify-otp-phone")
                : navigate("/upload-vehicle-images");
            }
          } catch (error) {
            ErrorToast(error.response.data.message || "Something went wrong.");
          } finally {
            setLoading(false);
          }
        }
      },
    });

  // useEffect(() => {
  //   const values = JSON.parse(localStorage.getItem("completeProfileValues"));
  //   setProfileBase(values?.profileBase ? values?.profileBase : null);
  //   setSocialBase(values?.socialBase ? values?.socialBase : null);
  //   setSocialBackBase(values?.socialBackBase ? values?.socialBackBase : null);
  //   setProfilePicture(values?.profilePicture ? values?.profilePicture : null);
  //   setSocialBack(
  //     values?.socialSecurityCardBack ? values?.socialSecurityCardBack : null
  //   );
  //   setSocial(
  //     values?.socialSecurityCardFront ? values?.socialSecurityCardFront : null
  //   );
  //   setPhone(values?.phone ? values?.phone : "");
  //   setReferal(values?.referal ? values?.referal : "");
  // }, []);

  function getEighteenYearsAgo() {
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.setFullYear(today.getFullYear() - 18)
    );
    const year = eighteenYearsAgo.getFullYear();
    const month = (eighteenYearsAgo.getMonth() + 1).toString().padStart(2, "0");
    const day = eighteenYearsAgo.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return (
    <div class="w-full  bg-white">
      <div class="grid lg:grid-cols-4 md:grid-cols-3 items-center">
        <section class="lg:col-span-3 md:col-span-2 max-w-2xl w-full lg:p-6 mx-auto">
          <div class="flex justify-center w-full min-h-screen">
            <div class="flex items-center  w-full  p-6 lg:px-12 ">
              <div class="w-full">
                <div className="w-full flex justify-center items-center">
                  {/* <Link
                to={"/signup"}
                className="w-10 h-10 mr-auto rounded-full flex justify-center items-center text-md bg-[#c00000] text-white"
              >
                <FaArrowLeft />
              </Link> */}
                  <h1 class="text-[17px]  lg:text-[24px] font-semibold text-center tracking-tight text-gray-800 capitalize ">
                    Update Personal Info{" "}
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
                        onClick={handleProfileClick}
                        className={`w-[100px]  h-[100px] relative rounded-lg bg-white border-2  text-gray-500 flex justify-center items-center text-2xl font-medium transition-all duration-500 ${
                          touched.profilePicture && errors.profilePicture
                            ? "border-[#c00000] shake"
                            : "border-gray-200"
                        }`}
                      >
                        {profileBase ? (
                          <img
                            src={profileBase}
                            className="w-full h-full object-contain "
                          />
                        ) : (
                          <GoPlus />
                        )}
                        {profileBase && (
                          <button
                            type="button"
                            ref={buttonRef}
                            onClick={() => {
                              setProfilePicture(null);
                              setProfileBase(null);
                              values.profilePicture = null;
                            }}
                            className="absolute bottom-1 w-6 h-6  flex justify-center items-center right-1 p-2 bg-red-500 text-white rounded-lg"
                            aria-label="Remove image"
                          >
                            <IoMdClose />
                          </button>
                        )}
                      </button>
                      <input
                        type="file"
                        id="profilePicture"
                        name="profilePicture"
                        accept="image/*"
                        capture="user"
                        className="hidden"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleProfileChange(e);
                          handleChange(e);
                        }}
                      />

                      <span className="text-[13px] font-semibold text-gray-800 ">
                        Upload Profile Photo
                      </span>
                      {errors.profilePicture && touched.profilePicture ? (
                        <p className="text-red-700 text-sm ml-1 font-medium">
                          {errors.profilePicture}
                        </p>
                      ) : null}
                    </div>
                    <div className="w-full grid grid-cols-2 gap-2">
                      <div>
                        <div class="relative flex items-center">
                          <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Enter First Name"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                          />

                          <span className="absolute right-4 text-xl text-gray-400">
                            <FiUser />{" "}
                          </span>
                        </div>
                        {errors.firstName && touched.firstName ? (
                          <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                            {errors.firstName}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <div class="relative flex items-center">
                          <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter Last Name"
                            class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                          />
                          <span className="absolute right-4 text-xl text-gray-400">
                            <FiUser />{" "}
                          </span>
                        </div>
                        {errors.lastName && touched.lastName ? (
                          <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                            {errors.lastName}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="w-full grid grid-cols-2 gap-2">
                      <div>
                        <div class="relative flex items-center">
                          <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                            MI
                          </label>
                          <input
                            type="text"
                            id="MI"
                            name="MI"
                            value={values.MI}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter MI"
                            class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                          />

                          <span className="absolute right-4 text-xl text-gray-400">
                            <FiUser />{" "}
                          </span>
                        </div>
                        {errors.MI && touched.MI ? (
                          <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                            {errors.MI}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <div class="relative flex items-center">
                          <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                            Suffix
                          </label>
                          <input
                            type="text"
                            id="suffix"
                            name="suffix"
                            value={values.suffix}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter suffix"
                            class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                          />

                          <span className="absolute right-4 text-xl text-gray-400">
                            <FiUser />{" "}
                          </span>
                        </div>
                        {errors.suffix && touched.suffix ? (
                          <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                            {errors.suffix}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div>
                      <div class="relative flex items-center">
                        <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                          D.O.B{" "}
                        </label>
                        <input
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={values.dateOfBirth}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          max={getEighteenYearsAgo()}
                          placeholder="12/04/2024"
                          class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                        />

                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#bbb"
                          stroke="#bbb"
                          class="w-[18px] h-[18px] absolute right-4"
                          viewBox="0 0 682.667 682.667"
                        >
                          <defs>
                            <clipPath id="a" clipPathUnits="userSpaceOnUse">
                              <path
                                d="M0 512h512V0H0Z"
                                data-original="#000000"
                              ></path>
                            </clipPath>
                          </defs>
                          <g
                            clip-path="url(#a)"
                            transform="matrix(1.33 0 0 -1.33 0 682.667)"
                          >
                            <path
                              fill="none"
                              stroke-miterlimit="10"
                              stroke-width="40"
                              d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                              data-original="#000000"
                            ></path>
                            <path
                              d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                              data-original="#000000"
                            ></path>
                          </g>
                        </svg> */}
                      </div>
                      {errors.dateOfBirth && touched.dateOfBirth ? (
                        <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                          {errors.dateOfBirth}
                        </p>
                      ) : null}
                      <p className="text-gray-500 text-[10px]">
                        ( You must be at least 18 years old to access the app. )
                      </p>
                    </div>

                    <div>
                      <div class="relative flex items-center  ">
                        <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                          Gender
                        </label>

                        <select
                          type="date"
                          id="gender"
                          name="gender"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                        >
                          {" "}
                          {values?.gender !== "" && (
                            <option value={values.gender}>
                              {values.gender}
                            </option>
                          )}
                          <option value={""}>--Select--</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      {errors.gender && touched.gender ? (
                        <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                          {errors.gender}
                        </p>
                      ) : null}
                    </div>

                    <div className="w-full grid grid-cols-2 gap-2">
                      <div>
                        <div class="relative flex items-center">
                          <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                            S.S.N
                          </label>
                          <input
                            type="text"
                            id="SSN"
                            name="SSN"
                            maxLength={9}
                            value={values.SSN}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter SSN"
                            class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                          />

                          <span className="absolute right-4 text-xl text-gray-400">
                            <FiUser />{" "}
                          </span>
                        </div>
                        {errors.SSN && touched.SSN ? (
                          <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                            {errors.SSN}
                          </p>
                        ) : null}
                      </div>

                      {isSocialLogin ? (
                        <>
                          <div>
                            <div class="relative flex   border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none items-center ">
                              <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                                Phone Number
                              </label>
                              <span className="w-[10%] border-r-2 border-gray-200  flex items-center justify-center text-gray-400">
                                +1
                              </span>
                              <input
                                type={"text"}
                                id="phoneNo"
                                name="phoneNo"
                                maxLength={10}
                                value={values.phoneNo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Phone Number (without +1 & dashes)"
                                class="px-4 py-3.5 bg-white w-[90%] text-sm rounded-lg outline-none"
                              />
                            </div>
                            {errors.phoneNo && touched.phoneNo ? (
                              <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                                {errors.phoneNo}
                              </p>
                            ) : null}
                          </div>

                          <div>
                            <div class="relative flex items-center">
                              <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                                Referral Code
                              </label>
                              <input
                                type="text"
                                id="referalCode"
                                name="referalCode"
                                value={values.referalCode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="XXXX"
                                class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                              />

                              <span className="absolute right-4 text-gray-400">
                                %
                              </span>
                            </div>
                            {errors.referalCode && touched.referalCode ? (
                              <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                                {errors.referalCode}
                              </p>
                            ) : null}
                          </div>
                        </>
                      ) : null}

                      <div>
                        <div class="relative flex items-center">
                          <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                            Driver License Number
                          </label>
                          <input
                            type="text"
                            id="driverLicenseNumber"
                            name="driverLicenseNumber"
                            value={values.driverLicenseNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter Number"
                            class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                          />

                          <span className="absolute right-4 text-xl text-gray-400">
                            <FiUser />{" "}
                          </span>
                        </div>
                        {errors.driverLicenseNumber &&
                        touched.driverLicenseNumber ? (
                          <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                            {errors.driverLicenseNumber}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div>
                      <div class="relative flex items-center">
                        <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                          Street
                        </label>
                        <input
                          type="text"
                          id="street"
                          name="street"
                          value={values.street}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Street Address"
                          class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                        />

                        <span className="absolute right-4 text-xl text-gray-400">
                          <HiOutlineMapPin />{" "}
                        </span>
                      </div>
                      {errors.street && touched.street ? (
                        <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                          {errors.street}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <div class="relative flex items-center  ">
                        <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                          State
                        </label>

                        <select
                          id="state"
                          name="state"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                        >
                          {" "}
                          {values?.state !== "" && (
                            <option value={values.state}>{values.state}</option>
                          )}
                          <option value={""}>--Select State--</option>
                          {Object.keys(data).map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.state && touched.state ? (
                        <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                          {errors.state}
                        </p>
                      ) : null}
                    </div>

                    <div className="w-full grid grid-cols-2 gap-3">
                      <div>
                        <div class="relative flex items-center  ">
                          <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                            City
                          </label>

                          <select
                            id="city"
                            name="city"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                          >
                            {" "}
                            {values?.city !== "" && (
                              <option value={values.city}>{values.city}</option>
                            )}
                            <option value={""}>--Select City--</option>
                            {values.state &&
                              data[values.state].map((city) => (
                                <option key={city} value={city}>
                                  {city}
                                </option>
                              ))}
                          </select>
                        </div>
                        {errors.city && touched.city ? (
                          <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                            {errors.city}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <div class="relative flex items-center">
                          <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                            Zip Code
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={values.zipCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="XXXXX"
                            class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                          />

                          <span className="absolute right-4 text-xl text-gray-400">
                            <HiOutlineMapPin />{" "}
                          </span>
                        </div>
                        {errors.zipCode && touched.zipCode ? (
                          <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                            {errors.zipCode}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-2">
                      <div className="w-full h-aut0 flex flex-col justify-start items-start gap-1">
                        <div className="h-[139px] relative bg-white rounded-lg border-2 border-gray-200 p-3 w-full flex flex-col gap-2 justify-center items-center">
                          <div className="w-full flex items-center justify-center gap-1">
                            <span className="w-6 h-6 rounded-full bg-[#c00000] text-white flex items-center justify-center text-xs">
                              <ImProfile />
                            </span>
                            <span className="text-[13.5px] font-bold text-black">
                              Social Security
                            </span>
                          </div>
                          <span className="text-[12px] font-[510] text-black">
                            Front
                          </span>

                          <input
                            type="file"
                            id="socialSecurityCardFront"
                            name="socialSecurityCardFront"
                            accept="image/*"
                            className="hidden"
                            onBlur={handleBlur}
                            onChange={(e) => {
                              handleSocialFrontChange(e);
                              handleChange(e);
                            }}
                          />

                          <button
                            onClick={handleSocialFrontClick}
                            className="w-full flex items-center justify-center gap-2 text-black"
                          >
                            {socialBase ? (
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
                          {socialBase && (
                            <button
                              type="button"
                              onClick={() => {
                                setSocial(null);
                                setSocialBase(null);
                                values.socialSecurityCardFront = null;
                              }}
                              className="absolute top-2 w-6 h-6  flex justify-center items-center right-2 p-2 bg-red-500 text-white rounded-full"
                              aria-label="Remove image"
                            >
                              <IoMdClose />
                            </button>
                          )}
                        </div>
                        {errors.socialSecurityCardFront &&
                        touched.socialSecurityCardFront ? (
                          <p className="text-red-700 text-sm ml-1 font-medium">
                            {errors.socialSecurityCardFront}
                          </p>
                        ) : null}
                      </div>
                      <div className="w-full h-aut0 flex flex-col justify-start items-start gap-1">
                        <div className="h-[139px] relative  rounded-lg border-2 border-gray-200 p-3 w-full flex flex-col gap-2 justify-center items-center">
                          <div className="w-full flex items-center justify-center gap-1">
                            <span className="w-6 h-6 rounded-full bg-[#c00000] text-white flex items-center justify-center text-xs">
                              <ImProfile />
                            </span>
                            <span className="text-[13.5px] font-bold text-black">
                              Social Security
                            </span>
                          </div>
                          <input
                            type="file"
                            id="socialSecurityCardBack"
                            name="socialSecurityCardBack"
                            accept="image/*"
                            className="hidden"
                            onBlur={handleBlur}
                            onChange={(e) => {
                              handleSocialBackChange(e);
                              handleChange(e);
                            }}
                          />
                          <span className="text-[12px] font-[510] text-black">
                            Back
                          </span>

                          <button
                            onClick={handleSocialBackClick}
                            className="w-full flex items-center justify-center gap-2 text-black"
                          >
                            {socialBackBase ? (
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

                          {socialBackBase && (
                            <button
                              type="button"
                              onClick={() => {
                                setSocialBack(null);
                                setSocialBackBase(null);
                                values.socialSecurityCardBack = null;
                              }}
                              className="absolute top-2 w-6 h-6  flex justify-center items-center right-2 p-2 bg-red-500 text-white rounded-full"
                              aria-label="Remove image"
                            >
                              <IoMdClose />
                            </button>
                          )}
                        </div>
                        {errors.socialSecurityCardBack &&
                        touched.socialSecurityCardBack ? (
                          <p className="text-red-700 text-sm ml-1 font-medium">
                            {errors.socialSecurityCardBack}
                          </p>
                        ) : null}
                      </div>
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
                    <span>Next </span>

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

          <div className="  mx-4 rounded-2xl p-4 bg-white">
            <h4 class="text-[#c00000]  text-lg font-semibold">
              Complete Profile
            </h4>
            <p class="text-[13px] text-[#c00000] mt-2">
              Complete your profile by providing your personal details for your
              account.
            </p>
          </div>
          <div className="px-4">
            <h4 class="text-white  text-lg font-semibold">Add Vehicle</h4>
            <p class="text-[13px] text-white mt-2">
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

export default CompleteProfile;
