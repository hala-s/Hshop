import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate, useParams } from "react-router-dom";
import Input from "../pages/Input.jsx";
export default function Review()  {
    const { product } = useParams();
  const initialValues = {
    rate: "",
    comment: "",
  };
  const onSubmit = async (users) => {
    console.log(product);

    // const token =localStorage.getItem("user token");
    // console.log(token);

    // const { data } = await axios.post(
    //   `${import.meta.env.VITE_API_URL}/products/${product}/review`,
    //   users,
    //   {headers : {Authorization:`Tariq__${token}`}}
    // );
    //  console.log(data);
    // if (data.message == "success") {
    
    //   toast.success("Review added successfully", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: false,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
      
    // }
  };
  const reviewSchema = yup.object({
    comment: yup.string(),
    rate: yup
      .number()
      .required("rating is required").max(5,'5 stars in max')
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: reviewSchema,
  });
  const inputs = [
    {
      id: "comment",
      type: "text",
      name: "comment",
      title: "comment",
      value: formik.values.comment,
    },
    {
      id: "rate",
      type: "number",
      name: "rate",
      title: "rate",
      value: formik.values.rate,
    },
  ];
  const renderInputs = inputs.map((input, index) => (
    <Input
      type={input.type}
      id={input.id}
      name={input.name}
      value={input.value}
      title={input.title}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched}
      errors={formik.errors}
      key={index}
    />
  ));

  return (

        <div className="d-flex justify-content-center mt-2">
          <form onSubmit={formik.handleSubmit}>
            {renderInputs}
            <div className="text-center mt-3 ">
              <button
                className="m-2 btn "
                type="submit"
                disabled={!formik.isValid}
              >
               Submit
              </button>
             
            </div>
          </form>
      </div>

  );
}
