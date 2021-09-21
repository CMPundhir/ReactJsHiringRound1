import React, { useState, setState } from "react";
import "./otpPage.css";
import signup from ".././signup/signup";
import image1 from ".././asset/OtpVerificationPageSlider.png";
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

function OtpPage({ history }) {
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [otps, setOtps] = useState("123456");
  const [MobileNumber, setMobileNumber] = useState("");

  const jump = () => {
    if (otps) {
      console.log("ok");
    } else {
      console.log("notok");
    }
  };

  const intentSignUp = () => {
    history.push("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { mobile } = e.target.elements.mobile;
    const { otp } = e.target.elements.otp;

    setMobileNumber(mobile);
    setOtps(otp);

    axios
      .post("http://api.impsguru.com/api/verifyOtp", {
        MobileNumber: mobile,
        otp: otp,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <div className="banner-block">
            <img className="img-fluid" src={image1} alt="image_1" />
            <p className="text-center fw-bold fs-5">
              Get you payment setteled in minutes
            </p>
            <p className="text-center  fs-9">
              Connect your bank card, and create accounts in the selected
              currency.
            </p>
          </div>
        </div>
        <div className="col-6 position-relative">
          <div className="row">
            <img
              className="w-25 p-3 position-absolute top-0 end-0"
              src={image2}
              alt="image_2"
            />
          </div>

          <div className="row login-form">
            <Form>
              <h3>
                <span className="font-weight-bold">OTP Varification!</span>
              </h3>

              <span className="font-weight-bold">
                A 6 digit code has been sent to +91xxxxxxx49
              </span>

              <br />
              <FormGroup>
                <Label className="mt-5 mb-1 ">Enter Code</Label>
                <Input
                  className="input"
                  type="text"
                  placeholder="******"
                ></Input>
              </FormGroup>
              <FormGroup>
                <div className="row">
                  <Button className="btn" onClick={jump}>
                    Verify
                  </Button>
                </div>
              </FormGroup>
              <FormGroup>
                <div className="row">
                  <Button className="btns" onClick={intentSignUp}>
                    Back to login
                  </Button>
                </div>
              </FormGroup>
              <br />
            </Form>
          </div>
          <div className="row"></div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(OtpPage);
