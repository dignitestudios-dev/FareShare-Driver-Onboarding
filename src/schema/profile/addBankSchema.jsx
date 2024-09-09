import * as Yup from "yup";

export const addBankSchema = Yup.object({
  accountNumber: Yup.string()
    .required("Please provide your account number.")
    .matches(/^\d+$/, "Account number must be a numeric value."),
  accountHolderName: Yup.string().required(
    "Please provide your account holder name."
  ),
  routingNumber: Yup.string()
    .required("Please provide your routing number.")
    .matches(/^\d+$/, "Routing number must be a numeric value."),
});
