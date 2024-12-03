import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;
export const vehicleSchema = Yup.object({
  vehicleName: Yup.string().required("Please enter your vehicle model"),
  vehicleMake: Yup.string().required("Please enter your vehicle make"),
  modelYear: Yup.string()
    .matches(/^\d{4}$/, "Please enter a valid year in YYYY format") // Ensure it's a 4-digit year
    .test(
      "valid-year",
      `Year must be between ${currentYear - 100} and ${nextYear}`,
      (value) => {
        const year = parseInt(value, 10);
        return year >= currentYear - 100 && year <= nextYear;
      }
    )
    .required("Please enter your vehicle registration year"),
  plateNumber: Yup.string().required("Please enter your vehicle number plate."),
  isWheelChairAccessible: Yup.boolean(),
  driverLicenseCardFront: Yup.mixed().required(
    "Provide Driver License Front Image."
  ),
  driverLicenseCardBack: Yup.mixed().required(
    "Provide Driver License Back Image."
  ),
  driverLicenseExpiryDate: Yup.string().required(
    "Please provide driver license expiration date."
  ),
  vehicleRegistrationExpiryDate: Yup.string().required(
    "Please provide vehicle registration expiration date."
  ),
  proofInsuranceExpiryDate: Yup.string().required(
    "Please provide proof of insurance expiration date."
  ),
  proofInsurance: Yup.mixed().required("Provide Proof of insurance Image."),
  vehicleRegistrationCard: Yup.mixed().required(
    "Provide Vehicle Registration Card Image."
  ),
});
