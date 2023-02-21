let APIURL = "";

let hostname = window.location.hostname;

debugger;
if (hostname === "localhost" || hostname === "127.0.0.1") {
  APIURL = "http://localhost:4000";
} else {
  APIURL = "https://nov2022-movie-db.onrender.com";
}

export default APIURL;
