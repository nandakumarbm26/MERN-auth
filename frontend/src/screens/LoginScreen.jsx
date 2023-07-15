import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, FormGroup, FormLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, error }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log({ email, password });
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {isLoading && <Loader/>}
      <Form onSubmit={submitHandler}>
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
        <Button type="submit" variant="primary">
          Sign In
        </Button>
        <Row className="py-3">
          <Col>
            New Customer? <Link to="/register">Regiter here</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
