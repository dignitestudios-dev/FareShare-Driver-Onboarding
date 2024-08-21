import * as Yup from "yup";

export const verifyOtpSchema = Yup.object({
  //   email: Yup.string().email().required("Please enter your email"),
  otp1: Yup.string().max(1).required(),
  otp2: Yup.string().max(1).required(),
  otp3: Yup.string().max(1).required(),
  otp4: Yup.string().max(1).required(),
});
