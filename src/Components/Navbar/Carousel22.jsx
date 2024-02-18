import React from "react";
import ReactSlidy from "react-slidy";
import "react-slidy/lib/styles.css";
import db from "../server/db.json";
import { Link } from "react-router-dom";

const Carousel = () => {
  let width = window.innerWidth;
  return (
    <div className="Carousel">
      <ReactSlidy
        numOfSlides={
          width > 1400
            ? 4
            : width > 1000
            ? 4
            : width > 700
            ? 3
            : width > 410
            ? 3
            : 3
        }
      >
        {db.data.movies.filter((series) => series.year_of_issue === 2020).map((item, index) => (
          <div className="Carousel_mov" key={index}>
            <Link to={`/${item.id}`}>
              <img src={item.image} alt={item.title} />
            </Link>
          </div>
        ))}
      </ReactSlidy>
    </div>
  );
};

export default Carousel;
