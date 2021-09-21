import React, { useState } from "react";
import "../css/style.css";
import image1 from ".././asset/LoginPageSliderImage.png";
import image2 from ".././asset/logo.png";
import image3 from ".././asset/LoginScreenHiIcon.png";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { validPassword, validPhone } from "../js/regex";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

function Login({ history }) {
  const [password, setPassword] = useState("");
  const [pwdError, setPwdError] = useState(false);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneErr] = useState(false);

  // Validation for Phone Number
  const validatePhoneNumber = (e) => {
    e.preventDefault();
    if (e.target.value !== "undefined") {
      if (!validPhone.test(e.target.value)) {
        setPhone(e.target.value);
        setPhoneErr(true);
      } else if (e.target.value.length < 10) {
        setPhone(e.target.value);
        setPhoneErr(true);
      } else if (e.target.value.length == 10) {
        setPhone(e.target.value);
        setPhoneErr(false);
      } else {
        setPhoneErr(false);
      }
    }
  };

  // Validation for Password
  const validatePassword = (e) => {
    e.preventDefault();
    if (e.target.value !== "undefined") {
      if (!validPassword.test(e.target.value)) {
        setPassword(e.target.value);
        setPwdError(true);
      } else {
        setPwdError(false);
      }
    }
  };

  // Check for data on API on submit for Login
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pwdError && !phoneError) {
      const data = new FormData(e.target);

      setPhone(data.get("mobile"));
      setPassword(data.get("password"));
      axios
        .post("http://api.impsguru.com/api/login", {
          MobileNumber: phone,
          Password: password,
        })
        .then((response) => {
          history.push("/otp");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 col-sm-6">
          <div className="banner-block">
            <img className="img-fluid" src={image1} alt="image_1" />
            <p className="text-center fw-bold fs-5">
              Get you payment setteled in minutes
            </p>
            <p className="text-center fs-6">
              Connect your bank card, and create accounts in the selected
              currency.
            </p>
          </div>
        </div>
        <div className="col-12 col-md-6 col-sm-6">
          <div className="row p-3">
            <div className="col">
              <img
                className="img-fluid w-25 h-0 float-end"
                src={image2}
                alt="image_2"
              />
            </div>
          </div>
          <div className="row p-3">
            <div className="col">
              <img
                className="img-fluid"
                src={image3}
                style={{ marginLeft: "10px", width: "70px" }}
                alt="image_3"
              />
            </div>
          </div>
          <div className="row justify-content-md-center login-form">
            <Form onSubmit={handleSubmit}>
              <h3>
                <span className="font-weight-bold">Welcome back!</span>
              </h3>
              <span className="font-weight-bold">
                Please login to access your account
              </span>
              <br />
              <FormGroup>
                <Label className="mt-3 mb-1 ">Phone Number</Label>
                <Input
                  className="input"
                  type="number"
                  name="mobile"
                  placeholder="eg.8888xxxx40"
                  onChange={validatePhoneNumber}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label className="mt-4 mb-1 font-weight: bold">Password</Label>
                <Input
                  type="password"
                  placeholder="*********"
                  name="password"
                  onChange={validatePassword}
                ></Input>
              </FormGroup>

              <FormGroup>
                <Input
                  className="form-check-input mt-2 mb-2 md-2"
                  type="checkbox"
                  id="rememberMe"
                ></Input>
                <Label
                  className="form-check-label mt-2 mb-2 md-2"
                  for="rememberMe"
                >
                  {" "}
                  &nbsp; Remember me
                </Label>
              </FormGroup>
              <div className="row">
                <Button type="submit" className="btn">
                  Login
                </Button>
              </div>
              <div className="row mt-1">
                <Button
                  className="btns"
                  onClick={() => {
                    history.push("/signup");
                  }}
                >
                  Sign Up
                </Button>
              </div>
              <div className="row">
                {pwdError && <p>Your password is invalid</p>}
                {phoneError && <p>Your phone no is invalid</p>}
              </div>
            </Form>
          </div>
          <div className="row mt-5">
            <span className="text-center fs-6">Terms &amp; Condition</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
