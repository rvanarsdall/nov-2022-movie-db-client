import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import FullWidthButton from "../../Buttons/FullWidthButton";

const Signup = (props) => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    let url = `http://localhost:4000/user/signup`;

    let bodyObject = JSON.stringify({ firstName, lastName, email, password });

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: "POST",
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      if (data.message === "Success") {
        //  We are free to navigate to another page
        props.updateToken(data.token);
        navigate("/movie");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <h2>Signup</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>First Name: </Label>
          <Input innerRef={firstNameRef} />
        </FormGroup>
        <FormGroup>
          <Label>Last Name: </Label>
          <Input innerRef={lastNameRef} />
        </FormGroup>
        <FormGroup>
          <Label>Email: </Label>
          <Input innerRef={emailRef} />
        </FormGroup>

        <FormGroup>
          <Label>Password: </Label>
          <Input type="password" innerRef={passwordRef} />
        </FormGroup>
        <FullWidthButton>
          <Button type="submit" color="danger">
            Sign Up
          </Button>
        </FullWidthButton>
      </Form>
    </>
  );
};

export default Signup;
