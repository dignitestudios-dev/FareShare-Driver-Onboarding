import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
export const completeProfileSchema = Yup.object({
  firstName: Yup.string().required("Please enter your first name"),
  lastName: Yup.string().required("Please enter your last name"),
  MI: Yup.string(),
  suffix: Yup.string(),
  dateOfBirth: Yup.date().required("Please enter your D.O.B"),
  gender: Yup.string().required("Please select your gender."),
  SSN: Yup.string().required("Please enter your SSN"),
  driverLicenseNumber: Yup.string().required(
    "Please enter your Driving License Number."
  ),
  street: Yup.string().required("Please enter your street address."),
  city: Yup.string().required("Please enter your city."),
  state: Yup.string().required("Please enter your state."),
  zipCode: Yup.string().required("Please enter your zip code."),
  profilePicture: Yup.mixed().required("An image is required"),
  socialSecurityCardFront: Yup.mixed().required(
    "Provide Social Security Card's Front Image."
  ),
  socialSecurityCardBack: Yup.mixed().required(
    "Provide Social Security Card's Back Image."
  ),
});
