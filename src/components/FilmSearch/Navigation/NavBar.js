import { Grid, Toolbar, Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <AppBar sx={{ backgroundColor: "#bdb8b7", position: "absolute" }}>
      <Toolbar>
        <Grid container sx={{ placeItems: "center" }}>
          <Grid item xs={12} sx={{ marginLeft: 25 }}>
            <Button
              size="large"
              component={Link}
              to={"/"}
              sx={{
                marginLeft: "auto",
                backgroundColor: "#121212",
                color: "#EBF2FA",
                "&:hover": {
                  backgroundColor: "#EBF2FA",
                  color: "black",
                },
              }}
              variant="contained"
            >
              Popular
            </Button>
            <Button
              size="large"
              component={Link}
              to={"/movies"}
              sx={{
                marginLeft: 1,
                backgroundColor: "#121212",
                color: "#EBF2FA",
                "&:hover": {
                  backgroundColor: "#EBF2FA",
                  color: "black",
                },
              }}
              variant="contained"
            >
              Search Movies
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
