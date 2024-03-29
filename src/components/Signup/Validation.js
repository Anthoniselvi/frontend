const Validation = (signupData) => {
  let errors = {};

  if (!signupData.name) {
    errors.name = "Name is required";
  }
  // You have a comment here about additional name validation, which is currently commented out. Depending on your requirements, you can uncomment and add additional name validation as needed.

  if (!signupData.age) {
    errors.age = "Age is required";
  }

  if (!signupData.gender) {
    errors.gender = "Kindly select Gender";
  }

  if (!signupData.city) {
    errors.city = "City is required";
  }

  if (!signupData.mobile) {
    errors.mobile = "Phone Number is required";
  } else if (signupData.mobile.length !== 10) {
    errors.mobile = "Mobile Number must be 10 digits";
  } else if (!/^\d+$/.test(signupData.mobile)) {
    errors.mobile = "Mobile Number must contain only digits";
  }

  if (!signupData.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
    errors.email = "Email is invalid";
  }

  if (!signupData.password) {
    errors.password = "Password is required";
  } else if (signupData.password.length < 5) {
    errors.password = "Password must be more than 5 characters";
  }

  return errors;
};

export default Validation;
