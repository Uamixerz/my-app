import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';


const CategoryCreatePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
  });

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();


    axios.post('http://127.0.0.1:8000/api/category', formData)
      .then(resp => {
        console.log(formData, resp);
        navigate(-1);
      })
      .catch(bad => {
        console.log("Bad request", bad);
      })
  };



  return (

    <form className="col-md-6 offset-md-3 needs-validation" onSubmit={handleSubmit} noValidate>
    <div className="mb-3">
      <label htmlFor="name">Назва категорії:</label>
      <input
        className="form-control"
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <div className="invalid-feedback">
        Please provide a valid name.
      </div>
    </div>
    <div className="mb-3">
      <label htmlFor="image">URL фотографії:</label>
      <input
        type="url"
        id="image"
        name="image"
        className="form-control"
        value={formData.image}
        onChange={handleInputChange}
        required
      />
      <div className="invalid-feedback">
        Please provide a valid url.
      </div>
    </div>
    <div className="mb-3">
      <label htmlFor="description">Опис категорії:</label>
      <textarea
        id="description"
        name="description"
        className="form-control"
        value={formData.description}
        onChange={handleInputChange}
        required
      />
      <div className="invalid-feedback">
        Please provide a valid description.
      </div>
    </div>
    
    <button className="btn btn-primary" type="submit">Додати категорію</button>
  </form>
  );
};

export default CategoryCreatePage;