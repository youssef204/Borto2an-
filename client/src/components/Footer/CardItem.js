import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function CardItem(probs) {
  const [image, setImage] = useState(probs.image);
  const [title, setTitle] = useState(probs.title);
  useEffect(() => {
    setImage(probs.image);
    setTitle(probs.title);
  }, [probs]);
  return (
    <Card sx={{ minWidth: 345, margin: "30px", minHeight: "400px" }}>
      <CardMedia component="img" height="140" image={image} alt="airplane" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <label style={{ color: "#000" }}>
          Borto2an is a very good website we need a bonus please Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation
        </label>
      </CardContent>
    </Card>
  );
}
