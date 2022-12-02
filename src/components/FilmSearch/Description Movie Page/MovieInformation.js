import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { img_300 } from "../Config/config";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Box, Button } from "@mui/material";

const KEY = "e856e5293d4d7bf4d699b110d9db036e";

export default function MovieInformation() {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const { movieid } = useParams();
  const [movie, setMovie] = useState();
  const [cast, setCast] = React.useState([]);
  const [isOpenCasts, setIsOpenCasts] = useState(false);

  const OnCLickChangeLocation = (e) => {
    e.preventDefault();
    navigate(-1);
    setIsOpenCasts(false);
  };

  const fetchMovies = () => {
    fetch(`https://api.themoviedb.org/3/movie/${movieid}?api_key=${KEY}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error(`Ничего не нашлось по запросу`));
      })
      .then(setMovie);
  };
  const fetchCredits = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieid}/credits?api_key=${KEY}&language=en-US`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error(`Ничего не нашлось по запросу`));
      })
      .then(setCast);
  };
  useEffect(() => {
    fetchMovies();
    fetchCredits();
    if (pathname === `/movies/${movieid}/cast`) {
      setIsOpenCasts(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieid, pathname]);

  return (
    <Grid
      display="inline-flex"
      container
      spacing={4}
      justifyContent="center"
      sx={{ backgroundColor: "#1c1c1e", marginTop: 5 }}
    >
      {movie && (
        <>
          <Box sx={{ width: "900px" }} key={movie.id}>
            <Typography variant="h4" color="white" align="center">
              {movie.original_title}
            </Typography>
            <Box display="inline-flex" sx={{ marginTop: 2 }}>
              <img src={`${img_300}/${movie.poster_path}`} alt={movie.title} />
              <Box display="block">
                <Typography variant="h6" color="white" sx={{ marginLeft: 2 }}>
                  Overview:
                  <Typography variant="body1" color="#c2c2c2">
                    {movie.overview}
                  </Typography>
                </Typography>
                <Typography
                  variant="h6"
                  color="white"
                  sx={{ marginLeft: 2, marginTop: 3 }}
                >
                  Release Date:
                  <Typography variant="body1" color="#c2c2c2">
                    {movie.release_date}
                  </Typography>
                </Typography>
              </Box>
            </Box>
            <Grid justifyContent="center">
              {isOpenCasts && (
                <Button
                  onClick={OnCLickChangeLocation}
                  size="large"
                  type="submit"
                  variant="contained"
                  component={Link}
                  sx={{
                    marginTop: 5,
                    marginLeft: "450px",
                    marginRight: "450px",
                    backgroundColor: "white",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "#121212",
                      color: "white",
                    },
                  }}
                >
                  Casts
                </Button>
              )}
              {!isOpenCasts && (
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  component={Link}
                  to={`${pathname}/cast`}
                  sx={{
                    marginTop: 5,
                    marginLeft: "450px",
                    marginRight: "450px",
                    backgroundColor: "white",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "#121212",
                      color: "white",
                    },
                  }}
                >
                  Casts
                </Button>
              )}
            </Grid>
          </Box>
          <Outlet context={[cast, setCast]} />
        </>
      )}
    </Grid>
  );
}
