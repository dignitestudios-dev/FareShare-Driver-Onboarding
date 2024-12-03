import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
export const vehicleImagesSchema = Yup.object({
  vehicleImageFront: Yup.mixed().required("Provide Front Image of the vehicle"),
  vehicleImageRear: Yup.mixed().required("Provide Rear Image of the vehicle"),
  vehicleImagePassengerSide: Yup.mixed().required(
    "Provide Passenger side Image of the vehicle"
  ),
  vehicleImageDriverSide: Yup.mixed().required(
    "Provide Driver Side Image of the vehicle"
  ),
  vehicleImageInteriorFront: Yup.mixed().required(
    "Provide Front Interior Image of the vehicle"
  ),
  vehicleImageInteriorBack: Yup.mixed().required(
    "Provide Back Interior Image of the vehicle"
  ),
});
