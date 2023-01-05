import Signup from "./signup/Signup";
import { Col, Container, Row } from "reactstrap";
import Login from "./login/Login";
const Auth = (props) => {
  return (
    <>
      <h2>Hello from Auth</h2>

      <Container>
        <Row>
          <Col md="6">
            <Signup />
          </Col>
          <Col md="6">
            <Login />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Auth;
