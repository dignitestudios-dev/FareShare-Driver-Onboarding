import React, { useContext, useEffect, useRef } from "react";
import { FaApple, FaArrowLeft, FaFacebook, FaFacebookF } from "react-icons/fa";
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
import { completeProfileValues } from "../../data/profile/completeProfile";
import { completeProfileSchema } from "../../schema/profile/completeProfileSchema";
import { FaCircleCheck } from "react-icons/fa6";
import api from "../../api/apiInterceptor";
import { IoMdClose } from "react-icons/io";

const CompleteProfile = () => {
  const { navigate, error, setError, isSocialLogin } = useContext(AppContext);
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
            const headers = {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            };
            const response = await axios.post(
              "https://backend.faresharellc.com/driver/completeProfile",
              formdata,
              {
                headers,
              }
            );
            if (response.data.success) {
              isSocialLogin && localStorage.setItem("phone", phone);
              isSocialLogin
                ? navigate("Verify Phone Otp", "/verify-otp-phone")
                : navigate("Verify Phone Otp", "/upload-vehicle-images");
            }
          } catch (error) {
            setError(error.response.data.message);
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
                    className={`w-[100px]  h-[100px] relative rounded-full bg-gray-50 border  text-[#c00000] flex justify-center items-center text-2xl font-medium transition-all duration-500 ${
                      touched.profilePicture && errors.profilePicture
                        ? "border-[#c00000] shake"
                        : "border-gray-200"
                    }`}
                  >
                    {profileBase ? (
                      <img
                        src={profileBase}
                        className="w-full h-full rounded-full"
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
                        className="absolute bottom-1 w-6 h-6  flex justify-center items-center right-1 p-2 bg-red-500 text-white rounded-full"
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

                  <span className="text-xs text-[#c00000] font-medium">
                    Upload Profile Photo
                  </span>
                  {errors.profilePicture && touched.profilePicture ? (
                    <p className="text-red-700 text-sm ml-1 font-medium">
                      {errors.profilePicture}
                    </p>
                  ) : null}
                </div>
                <div className="w-full grid grid-cols-2 gap-3">
                  <div>
                    <label class="block mb-1 text-sm  text-gray-500 font-medium ml-1 ">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="John"
                      class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                        errors.firstName && touched.firstName
                          ? "border-red-600 shake"
                          : null
                      }`}
                    />
                    {errors.firstName && touched.firstName ? (
                      <p className="text-red-700 text-sm font-medium">
                        {errors.firstName}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Doe"
                      class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                        errors.lastName && touched.lastName
                          ? "border-red-600 shake"
                          : null
                      }`}
                    />
                    {errors.lastName && touched.lastName ? (
                      <p className="text-red-700 text-sm font-medium">
                        {errors.lastName}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    MI
                  </label>
                  <input
                    type="text"
                    id="MI"
                    name="MI"
                    value={values.MI}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="XXXXXXXXX"
                    class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.MI && touched.MI ? "border-red-600 shake" : null
                    }`}
                  />
                  {errors.MI && touched.MI ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.MI}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    Suffix
                  </label>
                  <input
                    type="text"
                    id="suffix"
                    name="suffix"
                    value={values.suffix}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="XXXX"
                    class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.suffix && touched.suffix
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.suffix && touched.suffix ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.suffix}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label class="mb-1 flex justify-start items-center gap-1  text-sm text-gray-500 font-medium ml-1 ">
                    Date of Birth{" "}
                    <p className="text-gray-800">
                      ( You must have to be 18 years old to register. )
                    </p>
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
                    class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.dateOfBirth && touched.dateOfBirth
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />

                  {errors.dateOfBirth && touched.dateOfBirth ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.dateOfBirth}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    Gender{" "}
                  </label>
                  <select
                    type="date"
                    id="gender"
                    name="gender"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.gender && touched.gender
                        ? "border-red-600 shake"
                        : null
                    }`}
                  >
                    {" "}
                    {values?.gender !== "" && (
                      <option value={values.gender}>{values.gender}</option>
                    )}
                    <option value={""}>--Select--</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && touched.gender ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.gender}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    SSN
                  </label>
                  <input
                    type="text"
                    id="SSN"
                    name="SSN"
                    value={values.SSN}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="XXXXXXXXXX"
                    class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.SSN && touched.SSN ? "border-red-600 shake" : null
                    }`}
                  />
                  {errors.SSN && touched.SSN ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.SSN}
                    </p>
                  ) : null}
                </div>

                {isSocialLogin ? (
                  <>
                    <div>
                      <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1234567890"
                        class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                          phoneError ? "border-red-600 shake" : null
                        }`}
                      />
                      {phoneError ? (
                        <p className="text-red-700 text-sm font-medium">
                          {phoneError}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                        Referal Code
                      </label>
                      <input
                        type="text"
                        id="referal"
                        name="referal"
                        value={referal}
                        onChange={(e) => setReferal(e.target.value)}
                        placeholder="XXXXX"
                        class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                          referalError ? "border-red-600 shake" : null
                        }`}
                      />
                      {referalError ? (
                        <p className="text-red-700 text-sm font-medium">
                          {referalError}
                        </p>
                      ) : null}
                    </div>
                  </>
                ) : null}

                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    Driver License Number
                  </label>
                  <input
                    type="text"
                    id="driverLicenseNumber"
                    name="driverLicenseNumber"
                    value={values.driverLicenseNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="XXXXXXXXXXX"
                    class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.driverLicenseNumber && touched.driverLicenseNumber
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.driverLicenseNumber && touched.driverLicenseNumber ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.driverLicenseNumber}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    Street
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={values.street}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="XXXX Name Street, City, State"
                    class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.street && touched.street
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.street && touched.street ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.street}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Orlando"
                    class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.city && touched.city
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.city && touched.city ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.city}
                    </p>
                  ) : null}
                </div>

                <div className="w-full grid grid-cols-2 gap-3">
                  <div>
                    <label class="block mb-1 text-sm  text-gray-500 font-medium ml-1 ">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Florida"
                      class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                        errors.state && touched.state
                          ? "border-red-600 shake"
                          : null
                      }`}
                    />
                    {errors.state && touched.state ? (
                      <p className="text-red-700 text-sm font-medium">
                        {errors.state}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
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
                      class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                        errors.zipCode && touched.zipCode
                          ? "border-red-600 shake"
                          : null
                      }`}
                    />
                    {errors.zipCode && touched.zipCode ? (
                      <p className="text-red-700 text-sm font-medium">
                        {errors.zipCode}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="w-full grid grid-cols-2 gap-2">
                  <div className="w-full h-aut0 flex flex-col justify-start items-start gap-1">
                    <div className="h-[139px] relative bg-gray-50 rounded-2xl border border-gray-200 p-3 w-full flex flex-col gap-2 justify-center items-center">
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
                    <div className="h-[139px] relative bg-gray-50 rounded-2xl border border-gray-200 p-3 w-full flex flex-col gap-2 justify-center items-center">
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
  );
};

export default CompleteProfile;
