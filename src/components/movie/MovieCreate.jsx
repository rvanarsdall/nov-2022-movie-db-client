import { useRef } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import APIURL from "../../helper/environment";
import FullWidthButton from "../Buttons/FullWidthButton";

const MovieCreate = (props) => {
  const movieTitleRef = useRef();
  const movieDescriptionRef = useRef();
  const movieYearRef = useRef();
  const ratingRef = useRef();
  const isCurrentlyInTheatersRef = useRef();
  const formRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const movieTitle = movieTitleRef.current.value;
    const movieDescription = movieDescriptionRef.current.value;
    const movieYear = movieYearRef.current.value;
    const isCurrentlyInTheaters = isCurrentlyInTheatersRef.current.value;
    const rating = ratingRef.current.value;

    let url = `${APIURL}/movie/add`;

    let bodyObject = JSON.stringify({
      movieTitle,
      movieDescription,
      movieYear,
      isCurrentlyInTheaters,
      rating,
    });

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", props.token);

    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: "POST",
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      props.fetchMovies();
      formRef.current.reset();
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <Form onSubmit={handleSubmit} innerRef={formRef}>
        <FormGroup>
          <Label>Movie Title</Label>
          <Input innerRef={movieTitleRef} />
        </FormGroup>
        <FormGroup>
          <Label>Movie Description</Label>
          <Input innerRef={movieDescriptionRef} type="textarea" />
        </FormGroup>
        <FormGroup>
          <Label>Movie Year</Label>
          <Input innerRef={movieYearRef} />
        </FormGroup>
        <FormGroup>
          <Label>Currently In Theaters</Label>
          <Input type="select" innerRef={isCurrentlyInTheatersRef}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Rating</Label>
          <Input type="select" innerRef={ratingRef}>
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </Input>
        </FormGroup>
        <FullWidthButton>
          <Button>Submit Movie</Button>
        </FullWidthButton>
      </Form>
    </>
  );
};

export default MovieCreate;
