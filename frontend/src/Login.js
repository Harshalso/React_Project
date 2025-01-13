import React, {useState, useNavigate} from "react";
import { Link } from "react-router-dom";
import Validation from "./loginValidation";
import axios from "axios";

function LogIn() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (
      errors.email === "" &&      
      errors.password === ""
    ) {
      axios
        .post(`http://localhost:5000/login`, values)
        .then(response =>{
          navigate("/home");
        })
        .catch((error) => console.log(error));
    }
  
  };

  const handleInput = (event) => {
    setValues((prev) => ({...prev,[event.target.name]: [event.target.value]}))
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark vh-100">
      <div className="bg-white p-3 rounded w-25">

        <h2 className="text-center mb-3">Sign In</h2>

        <form action="" onSubmit={handleSubmit}>

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
            {errors.email && (<span className="text-danger">{errors.email}</span>)}
          </div>

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
            {errors.password && (<span className="text-danger">{errors.password}</span>)}
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0">
            Log in
          </button>

          <hr />

          <Link
            to="/"
            className="btn btn-default border w-100 rounded-0 text-decoration-none"
          >
            Create Account
          </Link>

        </form>

      </div>

    </div>

  );
}

export default LogIn;
