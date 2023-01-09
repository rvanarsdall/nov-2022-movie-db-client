import { useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";
import jwt_decode from "jwt-decode";
import FullWidthButton from "../Buttons/FullWidthButton";

const MovieTable = (props) => {
  const decoded = props.token ? jwt_decode(props.token) : "";
  console.log(decoded);
  const navigate = useNavigate();
  async function deleteMovie(id) {
    const url = `http://localhost:4000/movie/${id}`;

    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);

    let requestOptions = {
      headers: myHeaders,
      method: "DELETE",
    };
    try {
      let response = await fetch(url, requestOptions);
      let data = await response.json();
      console.log(data);
      props.fetchMovies();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Description</th>
            <th>Year</th>
            <th>In Theaters</th>
            <th>Rating</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.movies.map((movie) => (
            <tr key={movie._id}>
              <th scope="row">{movie.movieTitle}</th>
              <td>{movie.movieDescription}</td>
              <td>{movie.movieYear}</td>
              <td>{movie.isCurrentlyInTheaters ? "Yes" : "No"}</td>
              <td>{movie.rating}</td>
              <td>
                <FullWidthButton>
                  <Button
                    disabled={decoded.id !== movie.owner_id._id}
                    color="warning"
                    onClick={() => navigate(`/movie/${movie._id}`)}
                  >
                    Edit
                  </Button>
                </FullWidthButton>
              </td>
              <td>
                {" "}
                <FullWidthButton>
                  <Button
                    disabled={decoded.id !== movie.owner_id._id}
                    color="danger"
                    onClick={() => deleteMovie(movie._id)}
                  >
                    Delete
                  </Button>
                </FullWidthButton>
              </td>
              {/* {decoded.id === movie.owner_id._id ? (
                <>
                  {" "}
                  <td>
                    <Button
                      color="warning"
                      onClick={() => navigate(`/movie/${movie._id}`)}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    {" "}
                    <Button
                      color="danger"
                      onClick={() => deleteMovie(movie._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </>
              ) : null} */}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default MovieTable;
