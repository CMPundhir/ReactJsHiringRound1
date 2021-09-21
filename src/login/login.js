import React, { useState } from "react";
import "./login.css";
import image1 from ".././asset/LoginPageSliderImage.png";
import image2 from ".././asset/logo.png";
import image3 from ".././asset/LoginScreenHiIcon.png";
import axios from "axios";
import {
  Route,
  Link,
  BrowserRouter,
  useHistory,
  withRouter,
} from "react-router-dom";
import { validPassword, validPhone } from "../js/regex";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

function Login({ history }) {
  const [password, setPassword] = useState("");
  const [pwdError, setPwdError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneErr] = useState(false);
  const [button] = useState(true);
  const [MobileNumber, setMobileNumber] = useState("");
  const [Password, setUserPassword] = useState("");

  //const history = useHistory();

  const validatePhoneNumber = (e) => {
    if (e.target.value !== "undefined") {
      if (!validPhone.test(e.target.value)) {
        setPhoneErr(true);
        setPhone(e.target.value);
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

  const validatePassword = (e) => {
    if (e.target.value !== "undefined") {
      if (!validPassword.test(e.target.value)) {
        setPwdError(true);
        setPassword(e.target.value);
      } else {
        setPwdError(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { mobile } = e.target.elements.mobile;
    const { password } = e.target.elements.password;

    setMobileNumber(mobile);
    setUserPassword(password);

    axios
      .post("http://api.impsguru.com/api/login", {
        MobileNumber: mobile,
        Password: password,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    //console.log(pwdError, phoneError);
  };

  const intentSignUp = () => {
    history.push("/signup");
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
        <div className="col-12 col-md-6 col-sm-6 justify-content-md-center">
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
                className="img-fluid btn btn-xs w-0 float-start"
                src={image3}
                alt="image_3"
              />
            </div>
          </div>
          <div className="row p-5 m-5">
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
                  id="gridCheck"
                ></Input>
                <Label
                  className="form-check-label mt-2 mb-2 md-2"
                  for="gridCheck"
                >
                  {" "}
                  &nbsp; Remember me
                </Label>
              </FormGroup>
              <div className="row">
                <Button type="submit" className="btn">
                  Login
                </Button>
                <br />
              </div>
              <div className="row">
                <Button className="btns" onClick={intentSignUp}>
                  Sign Up
                </Button>
              </div>
              <div className="row">
                {pwdError && <p>Your password is invalid</p>}
                {phoneError && <p>Your phone no is invalid</p>}
              </div>
            </Form>
          </div>
          <div className="row">
            <span className="text-center fs-6">Terms &amp; Condition</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);