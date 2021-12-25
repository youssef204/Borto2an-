import React, { useState, useEffect } from "react";
import CardItem from "./CardItem";
import "./NewsComponentCSS.css";
export default function NewsComponent(probs) {
  const [title, setTitle] = useState(probs.title);
  useEffect(() => {
    setTitle(probs.title);
  }, [probs]);
  return (
    <>
      <div className="NewsPart">
        <label className="NewsTitle"> {title} </label>
        <div
          className="d-flex overflow-auto"
          style={{ width: "80%", margin: "auto" }}
        >
          <CardItem image="news1.jpg" title="CAI to MUN" />
          <CardItem image="news2.png" title="KSA to CAI" />
          <CardItem image="news3.jpg" title="MOI to CAI" />
          <CardItem image="news4.webp" title="HIO to PSG" />
          <CardItem image="news1.jpg" title="NYC to BRL" />
          <CardItem image="news2.png" title="MUN to CAI" />
        </div>
      </div>
    </>
  );
}
