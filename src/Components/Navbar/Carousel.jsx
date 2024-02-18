import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import db from "../server/db.json";
import { Link } from "react-router-dom";

import Slider from "react-slick";

const Carousel2 = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="carousel">

      <Slider {...settings}>
      {db.data.movies.filter((series) => series.year_of_issue === 2020).map((item, index) => (
          <div className="carousel-item" key={index}>
            <Link to={`/${item.id}`}>
              <img src={item.image} alt={item.title} />
              <p>{item.title} ({item.year_of_issue})</p>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel2;
