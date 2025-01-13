function Validation(values) {
  let errors = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  const mobile_pattern = /^\+\d{1,3} \d{10}$/;

  if (values.name === "") {
    errors.name = "Name is required";
  } else {
    errors.name = "";
  }

  if (values.mobile === "") {
    errors.mobile = "Mobile Number is required";
  } else if (!mobile_pattern.test(values.mobile)) {
    errors.mobile = "Invalid mobile number";
  } else {
    errors.mobile = "";
  }

  if (values.email === "") {
    errors.email = "Email required";
  } else if (!email_pattern.test(values.email)) {
    errors.email = "Invalid email";
  } else {
    errors.email = "";
  }

  if (values.password === "") {
    errors.password = "password should not be empty";
  } else if (!password_pattern.test(values.password)) {
    errors.password = "password did'nt match";
  } else {
    errors.password = "";
  }
}

export default Validation;
