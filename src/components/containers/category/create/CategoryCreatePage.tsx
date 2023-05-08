import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { ICategoryCreate, ICategoryCreateError } from './types';
import { useFormik } from 'formik';
import * as yup from "yup";
import classNames from 'classnames';

const CategoryCreatePage = () => {
  const initValues : ICategoryCreate = {
    name: '',
    image: '',
    description: ''
  }
  const navigate = useNavigate();
  

  const createSchema = yup.object({
    name: yup.string().required("Вкажіть назву"),
    description: yup.string().required("Вкажіть опис"),
    image: yup.string().required("Вкажіть url")
  });
  const onSubmitFormikData = (values: ICategoryCreate) => {
    console.log("Formik send ", values);
    axios.post('http://127.0.0.1:8000/api/category', values)
      .then(resp => {
        console.log(values, resp);
        navigate("/");
      })
      .catch(bad => {
        console.log("Bad request", bad);
      })
  }
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: createSchema,
    onSubmit: onSubmitFormikData
  });

  const {values, errors, touched, handleSubmit, handleChange} = formik;

  return (
    <div>
      <h1 className='text-center'>Додавання категорії</h1>
    <form className="col-md-6 offset-md-3" onSubmit={handleSubmit} noValidate>
    <div className="mb-3">
      <label htmlFor="name">Назва категорії:</label>
      <input
        className={classNames("form-control", {"is-invalid": errors.name  && touched.name})}
        type="text"
        id="name"
        name="name"
        value={values.name}
        onChange={handleChange}
        required
      />
      {errors.name && touched.name && <div className="invalid-feedback">
        {errors.name}
      </div>}
      
    </div>
    <div className="mb-3">
      <label htmlFor="image">URL фотографії:</label>
      <input
        type="url"
        id="image"
        name="image"
        className={classNames("form-control", {"is-invalid": errors.image  && touched.image})}
        value={values.image}
        onChange={handleChange}
        required
      />
      {errors.image && touched.image && <div className="invalid-feedback">
        {errors.image}
      </div>}
    </div>
    <div className="mb-3">
      <label htmlFor="description">Опис категорії:</label>
      <textarea
        id="description"
        name="description"
        className={classNames("form-control", {"is-invalid": errors.description && touched.description})}
        value={values.description}
        onChange={handleChange}
        required
      />
      {errors.description && touched.description && <div className="invalid-feedback">
        {errors.description}
      </div>}
    </div>
    
    <button className="btn btn-primary" type="submit">Додати категорію</button>
  </form>
  </div>
  );
};

export default CategoryCreatePage;