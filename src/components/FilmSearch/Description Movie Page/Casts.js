import { useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  ListItem,
  List,
  Typography,
  Grid,
  ListItemAvatar,
  Avatar,
  Divider,
  ListItemText,
} from "@mui/material";
import { img_300 } from "../Config/config";

export default function DescriptionMovie() {
  const [cast, setCast] = useOutletContext();

  const [actors, setActors] = useState([]);
  useEffect(() => {
    const newCast = cast.cast.slice(0, 19);
    setActors(newCast);
  }, []);
  return (
    <Grid width="900px" display="block">
      {actors.map((actor) => (
        <List key={actor.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={actor.name} src={`${img_300}/${actor.profile_path}`}></Avatar>
            </ListItemAvatar>
            <ListItemText>
              <Typography color="white">{actor.name}</Typography>
            </ListItemText>
          </ListItem>
          <Divider variant="unset" component="li" sx={{ borderColor: "white" }}></Divider>
        </List>
      ))}
    </Grid>
  );
}
