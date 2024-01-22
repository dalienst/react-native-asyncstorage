import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(4, "Password cannot be less than 4 characters")
    .required("This field is required"),
});

export {LoginSchema}