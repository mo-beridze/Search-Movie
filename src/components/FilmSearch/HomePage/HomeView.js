import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardMedia,
  Grid,
  Typography,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { img_300 } from "../Config/config";

export default function HomeView() {
  const KEY = "e856e5293d4d7bf4d699b110d9db036e";

  const [movies, setMovies] = useState([]);

  const fetchMovies = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${KEY}&language=en-US&page=1`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error(`Nothing found for your search`));
      })
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <Grid>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{
            marginTop: "10px",
            paddingBottom: 10,

            backgroundColor: "#1c1c1e",
          }}
        >
          {movies.map((movie) => (
            <Box
              key={movie.id}
              width="300px"
              height="500px"
              display="inline-block"
              variant="outlined"
              sx={{ marginLeft: 5, marginTop: 10 }}
            >
              <Card
                variant="elevation"
                sx={{
                  height: "500px",
                  borderRadius: 3,
                  background: "#bdb8b7",
                  boxShadow:
                    "rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px",
                }}
              >
                <CardMedia
                  component="img"
                  height="360px"
                  width="250px"
                  alt={movie.title}
                  image={`${img_300}/${movie.poster_path}`}
                ></CardMedia>
                <CardContent sx={{ paddingBottom: "5px", paddingTop: "5px" }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    align="center"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {movie.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    component={Link}
                    to={`movies/${movie.id}`}
                    sx={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      backgroundColor: "#121212",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "black",
                      },
                    }}
                  >
                    Description
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
