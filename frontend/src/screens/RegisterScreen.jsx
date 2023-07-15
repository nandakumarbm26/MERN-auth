import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, FormGroup, FormLabel } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading, error }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log({ email, password, name });
    try {
      if (password !== confirmPassword) {
        toast.error("passwords does not match");
      } else {
        const res = await register({ email, password, name }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {isLoading && <Loader />}
      <Form onSubmit={submitHandler}>
        <FormGroup className="my-2" controlId="name">
          <Form.Label>Name </Form.Label>
          <Form.Control
            type="text"
            placeholder="user name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup className="my-2" controlId="email">
          <Form.Label>Email </Form.Label>
          <Form.Control
            type="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormGroup>

        <FormGroup className="my-2" controlId="password">
          <Form.Label>Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup className="my-2" controlId="cnf-password">
          <Form.Label>confirm Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </FormGroup>
        <Button type="submit" variant="primary">
          Sign Up
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Alredy a Customer? <Link to="/register">register here</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
