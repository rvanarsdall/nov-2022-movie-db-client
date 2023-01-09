import React, { useState, useEffect } from "react";

import { Col, Container, Row } from "reactstrap";
import MovieCreate from "./MovieCreate";
import MovieTable from "./MovieTable";

const MovieIndex = (props) => {
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    const url = `http://localhost:4000/movie/`;
    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setMovies(data.movie);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (props.token) {
      fetchMovies();
    }
  }, [props.token]);

  return (
    <>
      <Container>
        <Row>
          <Col md="4">
            <MovieCreate token={props.token} fetchMovies={fetchMovies} />
          </Col>
          <Col md="8">
            <MovieTable
              movies={movies}
              token={props.token}
              fetchMovies={fetchMovies}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MovieIndex;
