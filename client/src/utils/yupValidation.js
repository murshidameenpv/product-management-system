import * as yup from "yup";

export const validation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(8)
    .matches(/[a-z]/, "at least one lowercase char")
    .matches(/[A-Z]/, "at least one uppercase char")
    .matches(
      /[a-zA-Z]+[^a-zA-Z\s]+/,
      "at least one number or special char (@,!,#, etc.)"
    ),
});
