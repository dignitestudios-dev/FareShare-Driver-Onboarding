import * as Yup from "yup";

export const addBankSchema = Yup.object({
  accountNumber: Yup.string().required("Please provide your account number."),
  accountHolderName: Yup.string().required(
    "Please provide your account holder name."
  ),
  routingNumber: Yup.string().required("Please provide your routing number."),
});
