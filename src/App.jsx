import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import MovieEdit from "./components/movie/MovieEdit";
import MovieIndex from "./components/movie/MovieIndex";

function App() {
  const [sessionToken, setSessionToken] = useState("");

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <div>
      <header className="container-fluid text-center text-white p-5 mb-3 bg-success">
        <h1>Upright Movie DB</h1>
      </header>

      <Routes>
        <Route path="/" element={<Auth updateToken={updateToken} />} />
        <Route path="/movie" element={<MovieIndex token={sessionToken} />} />
        <Route path="/movie/:id" element={<MovieEdit token={sessionToken} />} />
      </Routes>
      <footer className="container-fluid text-center mt-auto p-3">
        <h6>Upright Movie DB - 2023</h6>
      </footer>
    </div>
  );
}

export default App;
