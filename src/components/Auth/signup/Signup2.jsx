import React, { useState, useRef } from "react";

import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import APIURL from "../../../helper/environment";

const Signup = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(firstName);

    let url = `${APIURL}/user/signup`;
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
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Last Name: </Label>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Email: </Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label>Password: </Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" color="danger">
          Sign Up
        </Button>
      </Form>
    </>
  );
};

export default Signup;
