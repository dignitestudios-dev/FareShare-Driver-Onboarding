import * as Yup from "yup";

export const verifyOtpSchema = Yup.object({
  otp: Yup.string().min(4).max(4).required(),
});
