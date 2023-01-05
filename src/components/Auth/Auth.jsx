import Signup from "./signup/Signup";
import { Col, Container, Row } from "reactstrap";
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
            <Signup />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Auth;
