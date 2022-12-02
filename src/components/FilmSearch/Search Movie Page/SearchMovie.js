import MoviesView from "./MoviesView";
import { TextField, Button, Grid, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const KEY = "e856e5293d4d7bf4d699b110d9db036e";

export default function SearchMovie() {
  const [name, setName] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState(false);

  const responsivePaperStyle = {
    padding: "15px 20px",
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
  };

  useEffect(() => {
    if (name.length >= 1) {
      setErrorMessage(false);
    }
  }, [name]);

  const fetchMovies = () => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${name}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error(`Ничего не нашлось по запросу: ${name}`));
      })
      .then((data) => {
        console.log("123", data);
        if (!data.results.length) {
          return Promise.reject(new Error(`Ничего не нашлось по запросу: ${name}`));
        }
        setMovies(data.results);
        setStatus("resolved");
      })
      .catch((error) => {
        setStatus("rejected");
        setError(error);
      });
  };

  const handleNameChange = (event) => {
    setName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name.trim() === "") {
      setErrorMessage(true);
      return;
    }
    setName("");
    fetchMovies();
  };

  const notify = () =>
    toast.error("Enter the title", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <Grid>
      <Paper elevation={20} style={responsivePaperStyle}>
        <Grid align="center">
          <form onSubmit={handleSubmit}>
            <TextField
              variant="standard"
              type="text"
              id="search"
              label="Search movie"
              InputLabelProps={{
                disableAnimation: true,
                style: {
                  color: "black",
                },
              }}
              name="Search Movie"
              value={name}
              onChange={handleNameChange}
              sx={{ width: 300, color: "white" }}
            />
            <Button
              onClick={notify}
              type="submit"
              variant="contained"
              sx={{
                marginLeft: "auto",
                marginTop: 2,
                backgroundColor: "#121212",
                color: "#EBF2FA",
                "&:hover": {
                  backgroundColor: "#EBF2FA",
                  color: "black",
                },
              }}
            >
              Search
            </Button>
          </form>
        </Grid>
      </Paper>

      {errorMessage && (
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      )}
      <MoviesView name={name} movies={movies} status={status} error={error} />
    </Grid>
  );
}
