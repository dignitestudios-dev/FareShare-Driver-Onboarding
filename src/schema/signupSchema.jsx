import * as Yup from "yup";

export const signupSchema = Yup.object({
  email: Yup.string()
    .email("Email must be a valid email.")
    .required("Please enter your email"),
  phoneNo: Yup.string()
    .min(10, "Phone number must be at least 10 digits long")
    .required("Please enter your phone number"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Please enter your password"),
  referalCode: Yup.string().min(5).max(10),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  accept: Yup.boolean()
    .oneOf([true], "You must accept the Terms & Conditions")
    .required("You must accept the Terms & Conditions"),
});
