import React, { useContext, useRef, useState } from "react";
import { GoPlus } from "react-icons/go";
import { useFormik } from "formik";
import { vehicleImagesValues } from "../../data/profile/vehicleImages";
import { vehicleImagesSchema } from "../../schema/profile/vehicleImagesSchema";
import axios from "../../axios";
import { IoMdClose } from "react-icons/io";
import { ErrorToast, SuccessToast } from "../../components/global/Toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const UploadVehicleImages = () => {
  const navigate = useNavigate();
  const { setIsUploaded, setVehicle_id } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState({
    vehicleImageFront: null,
    vehicleImageRear: null,
    vehicleImagePassengerSide: null,
    vehicleImageDriverSide: null,
    vehicleImageInteriorFront: null,
    vehicleImageInteriorBack: null,
  });

  const [imageFiles, setImageFiles] = useState({
    vehicleImageFront: null,
    vehicleImageRear: null,
    vehicleImagePassengerSide: null,
    vehicleImageDriverSide: null,
    vehicleImageInteriorFront: null,
    vehicleImageInteriorBack: null,
  });

  // Handle image changes, previews, and files
  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => ({ ...prev, [key]: reader.result }));
      };
      setImageFiles((prev) => ({ ...prev, [key]: file }));
      reader.readAsDataURL(file);
    }
  };

  // Handle image removal
  const handleRemoveImage = (key) => {
    setImagePreviews((prev) => ({ ...prev, [key]: null }));
    setImageFiles((prev) => ({ ...prev, [key]: null }));
  };

  // Initialize formik for form handling
  const { handleBlur, handleChange, handleSubmit, errors, touched } = useFormik(
    {
      initialValues: vehicleImagesValues,
      validationSchema: vehicleImagesSchema,
      onSubmit: async (values) => {
        setLoading(true);

        const formdata = new FormData();
        for (const [key, file] of Object.entries(imageFiles)) {
          if (file) formdata.append(key, file);
        }

        try {
          const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          };
          const response = await axios.post(
            "/driver/completeVehicleDocs",
            formdata,
            { headers }
          );
          if (response.data.success) {
            setIsUploaded(true);
            SuccessToast("Vehicle Images Uploaded Successfully.");
            setVehicle_id(response?.data?.data?.vehicle?.id);
            localStorage.setItem(
              "vehicle_id",
              response?.data?.data?.vehicle?.id
            );
            navigate("/add-vehicle");
          }
        } catch (error) {
          ErrorToast(error.response.data.message || "Something went wrong.");
        } finally {
          setLoading(false);
        }
      },
    }
  );

  const imageKeys = [
    "vehicleImageFront",
    "vehicleImageRear",
    "vehicleImagePassengerSide",
    "vehicleImageDriverSide",
    "vehicleImageInteriorFront",
    "vehicleImageInteriorBack",
  ];

  const buttonRef = useRef();

  return (
    <div class="w-full  bg-white">
      <div class="grid lg:grid-cols-4 md:grid-cols-3 items-center">
        <section className="lg:col-span-3 md:col-span-2 max-w-2xl w-full lg:p-6 mx-auto">
          <div className="flex justify-center w-full min-h-screen">
            <div className="flex items-center  w-full  p-6 lg:px-12">
              <div className="w-full">
                <div className="w-full flex justify-center items-center">
                  <h1 className="text-[17px] lg:text-[24px] font-semibold text-center text-gray-800">
                    Upload vehicle images
                  </h1>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-4 mt-8"
                >
                  {imageKeys.map((imageKey) => (
                    <div
                      key={imageKey}
                      className="w-full flex flex-col gap-1 justify-center items-center relative"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            !buttonRef[imageKey]?.current?.contains(e.target)
                          ) {
                            document.getElementById(imageKey).click();
                          }
                        }}
                        className="w-full h-[136px] bg-white rounded-lg border-2  border-gray-200 text-gray-500 flex gap-1 flex-col justify-center items-center text-2xl font-medium"
                      >
                        {imagePreviews[imageKey] ? (
                          <>
                            <img
                              src={imagePreviews[imageKey]}
                              className="w-full h-full  object-contain"
                              alt={`Preview of ${imageKey}`}
                            />
                            <button
                              type="button"
                              ref={buttonRef[imageKey]}
                              onClick={() => handleRemoveImage(imageKey)}
                              className="absolute top-2 w-6 h-6  flex justify-center items-center right-2 p-2 bg-[#c00000] text-white rounded-full"
                              aria-label="Remove image"
                            >
                              <IoMdClose />
                            </button>
                          </>
                        ) : (
                          <>
                            <GoPlus />
                            <span className="text-xs text-[#000] font-semibold">
                              {imageKey
                                .replace("vehicleImage", "")
                                .replace(/([A-Z])/g, " $1")}
                            </span>
                          </>
                        )}
                      </button>
                      <input
                        type="file"
                        id={imageKey}
                        name={imageKey}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          handleImageChange(e, imageKey);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                      />
                      {errors[imageKey] && touched[imageKey] && (
                        <p className="text-red-700 text-sm ml-1 font-medium">
                          {errors[imageKey]}
                        </p>
                      )}
                    </div>
                  ))}

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-4 w-full px-6 py-3 text-sm tracking-wide text-white capitalize bg-[#c00000] rounded-full hover:bg-[#c00000] focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50"
                  >
                    {loading && (
                      <div
                        className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                        role="status"
                        aria-label="loading"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
                    <span>Save</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
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
          <div className="mx-4 rounded-2xl p-4 bg-white">
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

export default UploadVehicleImages;
