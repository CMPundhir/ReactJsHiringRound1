import React, { useState } from "react";
import "../css/style.css";
import image2 from ".././asset/logo.png";
import image1 from ".././asset/SignUpPageSliderImage.png";
import { validPassword, validPhone } from "../js/regex";
import { withRouter } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

function Signup({ history }) {
  const [panError, setPanError] = useState(false);
  const [phoneError, setPhoneErr] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [pwdError, setPwdError] = useState(false);
  const [MobileNumber, setMobileNumber] = useState("");
  const [Password, setUserPassword] = useState("");
  const [brandName, setBrandName] = useState("");
  const [userName, setName] = useState("");

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

  const intentLogIn = () => {
    history.push("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { mobile } = e.target.elements.mobile;
    const { name } = e.target.elements.name;
    const { brandname } = e.target.elements.brandname;
    const { email } = e.target.elements.email;
    const { password } = e.target.elements.password;

    setMobileNumber(mobile);
    setUserPassword(password);
    setEmail(email);
    setBrandName(email);
    setName(name);

    axios
      .post("http://api.impsguru.com/api/register", {
        MobileNumber: mobile,
        Name: name,
        BrandName: brandname,
        Email: email,
        Password: password,
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
        <div className="col-12 col-md-6 col-sm-6">
          <div className="banner-block">
            <img className="img-fluid" src={image1} alt="image_1" />
            <p class="text-center fw-bold fs-5">
              Get you payment setteled in minutes
            </p>
            <p class="text-center fs-9">
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

          <div className="row login-form">
            <Form onSubmit={handleSubmit}>
              <div className="row">
                <h3>
                  <span className="fw-bold">Sign Up</span>
                </h3>
              </div>
              <div className="row mt-2 mb-4">
                <span>Enter the required details</span>
              </div>
              <FormGroup>
                <div className="row">
                  <div className="col">
                    <Label class="input-group">Name on PAN</Label>
                    <Input
                      className="input"
                      type="text"
                      placeholder="John Doe"
                      onChange={validatePhoneNumber}
                    />
                  </div>
                  <div className="col">
                    <Label className="input-group">Brand Name</Label>
                    <Input
                      className="input"
                      type="text"
                      placeholder="Apple"
                      onChange={validatePhoneNumber}
                    />
                  </div>
                </div>
              </FormGroup>
              <FormGroup>
                <Label className="mt-3">Phone</Label>
                <Input
                  className="input"
                  type="text"
                  placeholder="eg.8888xxxx40"
                  onChange={validatePhoneNumber}
                />
              </FormGroup>

              <FormGroup>
                <Label className="mt-3 mb-1 ">Email</Label>
                <Input
                  className="input"
                  type="text"
                  placeholder="johndoe@example.com"
                  onChange={validatePhoneNumber}
                />
              </FormGroup>

              <FormGroup>
                <Label className="mt-4 mb-1 font-weight: bold">Password</Label>
                <Input
                  type="password"
                  placeholder="*********"
                  onChange={validatePassword}
                />
              </FormGroup>
              <div className="row">
                <Button className="btn">Sign up</Button>

                <Button
                  className="btns"
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  Back to Log in
                </Button>
                {pwdError && <p>Your password is invalid</p>}
                {phoneError && <p>Your phone no is invalid</p>}
              </div>
            </Form>
          </div>
          <div className="row mt-5">
            <span className="text-center fs-6 term-condition">
              Terms &amp; Condition
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Signup);
