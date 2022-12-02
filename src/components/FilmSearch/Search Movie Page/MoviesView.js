import { Typography } from "@mui/material";
import { useEffect } from "react";
import CardsMovie from "./CardsMovie";

export default function MoviesView({ name, movies, status, error }) {
  useEffect(() => {
    if (name === "") {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "rejected") {
    return (
      <Typography variant="h4" align="center" sx={{ color: "white" }}>
        {error.message}
      </Typography>
    );
  }

  if (status === "resolved") {
    return (
      <div>
        <CardsMovie movies={movies} />
      </div>
    );
  }
}
