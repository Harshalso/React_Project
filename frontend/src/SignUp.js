import React, { useState, useNavigate} from "react";
import { Link } from "react-router-dom";
import Validation from "./signupValidation";
import axios from "axios";

function SignUp() {
  const [values, setValues] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate({});

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    setErrors(Validation(values));
    if (
      errors.name === "" &&
      errors.mobile === "" &&
      errors.email === "" &&      
      errors.password === ""
    ) {
      axios
        .post(`http://localhost:5000/signup`, values)
        .then(response =>{
          navigate("/login");
        })
        .catch((error) => console.log(error));
    }
  };

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign-Up</h2>

        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            {/* name */}
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              onChange={handleInput}
              required
              className="form-control rounded-0"
            ></input>
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>

          {/* mobile no */}

          <div className="mb-3">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              placeholder="Enter Mobile Number"
              onChange={handleInput}
              required
              className="form-control rounded-0"
            ></input>
            {errors.mobile && (
              <span className="text-danger">{errors.mobile}</span>
            )}
          </div>

          {/* email */}
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleInput}
              required
              className="form-control rounded-0"
            ></input>
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>

          {/* password */}
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleInput}
              required
              className="form-control rounded-0"
            ></input>
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0">
            Sign Up
          </button>

          <hr />

          <Link
            to="/login"
            className="btn btn-default border w-100 rounded-0 text-decoration-none"
          >
            Log In
          </Link>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
