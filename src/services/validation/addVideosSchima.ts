import * as yup from "yup";

export const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  level: yup.string().required("Level is required"),
  instructor: yup.string().required("Instructor required"),
  price: yup.string().trim().required("Price Is Required")
});