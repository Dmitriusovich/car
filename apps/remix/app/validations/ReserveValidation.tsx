import * as yup from "yup"

export const reserveSchema = yup.object().shape({
  firstName: yup.string().required("field is required"),
  lastName: yup.string().required("field is required"),
  phoneNumber: yup.number().required("field is required"),
  age: yup
    .number()
    .required("field is required")
    .test("minor customer", "Client must be over 18 years of age", function (value) {
      return value >= 18
    }),
  email: yup.string().email().required("field is required"),
  address: yup.string().required("field is required"),
  city: yup.string().required("field is required"),
  zipCode: yup.number().required("field is required"),
})
