import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Alert,
} from "reactstrap";
import APIURL from "../../helper/environment";
import FullWidthButton from "../Buttons/FullWidthButton";

const MovieEdit = (props) => {
  const { id } = useParams();
  const [movieTitle, setMovieTitle] = useState("");
  const [movieDescription, setMovieDescription] = useState("");
  const [movieYear, setMovieYear] = useState("");
  const [isCurrentlyInTheaters, setIsCurrentlyInTheaters] = useState("");
  const [rating, setRating] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("danger");

  async function handleSubmit(e) {
    e.preventDefault();
    let url = `${APIURL}/movie/update/${id}`;

    let bodyObj = JSON.stringify({
      movieTitle,
      movieDescription,
      movieYear,
      isCurrentlyInTheaters,
      rating,
    });

    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      headers: myHeaders,
      body: bodyObj,
      method: "PATCH",
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      if (data.message == "movie updated") {
        setShowSuccessMessage(true);
        setAlertColor("success");
        setAlertMessage("Movie was updated");
        setTimeout(() => setShowSuccessMessage(false), 5000);
      } else {
        setShowSuccessMessage(true);
        setAlertColor("danger");
        setAlertMessage("Movie was not updated");
      }
    } catch (error) {
      console.log(error);
    }
  }
  const fetchMovie = async () => {
    const url = `${APIURL}/movie/${id}`;
    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setMovieTitle(data.movie.movieTitle);
      setMovieDescription(data.movie.movieDescription);
      setMovieYear(data.movie.movieYear);
      setRating(data.movie.rating);
      setIsCurrentlyInTheaters(data.movie.isCurrentlyInTheaters);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (props.token) {
      fetchMovie();
    }
  }, [props.token]);

  return (
    <>
      <Container>
        <Row>
          <Col md="4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              aspernatur voluptates dolor vitae beatae eum natus sed facere!
              Tempore, magni?
            </p>
            {showSuccessMessage ? (
              <Alert color={alertColor}>{alertMessage}</Alert>
            ) : null}
          </Col>
          <Col md="8">
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Movie Title</Label>
                <Input
                  value={movieTitle}
                  onChange={(e) => setMovieTitle(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Movie Description</Label>
                <Input
                  type="textarea"
                  value={movieDescription}
                  onChange={(e) => setMovieDescription(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Movie Year</Label>
                <Input
                  value={movieYear}
                  onChange={(e) => setMovieYear(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Currently In Theaters</Label>
                <Input
                  type="select"
                  value={isCurrentlyInTheaters}
                  onChange={(e) => setIsCurrentlyInTheaters(e.target.value)}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Rating</Label>
                <Input
                  type="select"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value={5}>5</option>
                  <option value={4}>4</option>
                  <option value={3}>3</option>
                  <option value={2}>2</option>
                  <option value={1}>1</option>
                </Input>
              </FormGroup>
              <FullWidthButton>
                <Button>Update Movie</Button>
              </FullWidthButton>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MovieEdit;
