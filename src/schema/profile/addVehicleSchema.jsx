import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
export const vehicleSchema = Yup.object({
  vehicleName: Yup.string().required("Please enter your vehicle model"),
  vehicleMake: Yup.string().required("Please enter your vehicle make"),
  modelYear: Yup.string().required(
    "Please enter your vehicle registration year"
  ),
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
