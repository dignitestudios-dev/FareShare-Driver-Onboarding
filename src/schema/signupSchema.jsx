import * as Yup from "yup";

export const signupSchema = Yup.object({
  email: Yup.string()
    .email("Email must be valid.")
    .required("Please enter your email"),
  phoneNo: Yup.string()
    .matches(/^[2-9]\d{2}[2-9]\d{2}\d{4}$/, "Phone number must be valid.")
    .min(10, "Phone number must be 10 digits long")
    .required("Please enter your phone number"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Please enter your password"),
  referalCode: Yup.string().min(4).max(4),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  accept: Yup.boolean()
    .oneOf([true], "You must accept the Terms & Conditions")
    .required("You must accept the Terms & Conditions"),
  twilioCheck: Yup.boolean()
    .oneOf([true], "You must accept the SMS Notification from FareShare.")
    .required("You must accept the SMS Notification from FareShare."),
});
