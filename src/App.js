import { Route, Routes } from "react-router-dom";
import * as React from "react";
import NavBar from "./components/FilmSearch/Navigation/NavBar";
import { Grid } from "@mui/material";

const HomeView = React.lazy(() => import("./components/FilmSearch/HomePage/HomeView"));
const SearchMovie = React.lazy(() =>
  import("./components/FilmSearch/Search Movie Page/SearchMovie")
);
const NotFoundView = React.lazy(() =>
  import("./components/FilmSearch/Not Found Page/NotFoundView")
);
const MovieInformation = React.lazy(() =>
  import("./components/FilmSearch/Description Movie Page/MovieInformation")
);
const DescriptionMovie = React.lazy(() =>
  import("./components/FilmSearch/Description Movie Page/Casts")
);

export default function FilmSearch() {
  return (
    <>
      <Grid
        sx={{
          backgroundColor: "#1c1c1e",
          width: "100vw",
          height: "100vh",
          overflowX: "hidden",
        }}
      >
        <Grid sx={{ marginTop: "64px", paddingBottom: "10px" }}>
          <NavBar />
        </Grid>
        <Routes>
          <Route
            path="/"
            element={
              <React.Suspense fallback={<>...</>}>
                <HomeView />
              </React.Suspense>
            }
          ></Route>
          <Route
            path="movies"
            element={
              <React.Suspense fallback={<>...</>}>
                <SearchMovie />
              </React.Suspense>
            }
          ></Route>
          <Route
            path="movies/:movieid"
            element={
              <React.Suspense fallback={<>...</>}>
                <MovieInformation />
              </React.Suspense>
            }
          >
            <Route
              path="cast"
              element={
                <React.Suspense fallback={<>...</>}>
                  <DescriptionMovie />
                </React.Suspense>
              }
            />
          </Route>
          <Route
            path="*"
            element={
              <React.Suspense fallback={<>...</>}>
                <NotFoundView />
              </React.Suspense>
            }
          ></Route>
        </Routes>
      </Grid>
    </>
  );
}
