import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoPricetags } from "react-icons/io5";

import data from "../server/db.json";
import CommentApp from "../Comments/Comments";

const { movies } = data.data;

const MoviePage = ({ setSiteLoc }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [views, setViews] = useState(0);

  useEffect(() => {
    const foundMovie = movies.find((item) => item.id === id);
    if (foundMovie) {
      setMovie(foundMovie);
      setViews(foundMovie.views + 1);
      setSiteLoc(`. >  ${foundMovie.title}`)
    } else {
      console.error("Фильм не найден");
    }
  }, [id, setSiteLoc]);

  return (
    <div className="MoviePage">
      {movie ? (
        <div className="short-item">
          <div className="short-head">
            <h3>
              <Link to={`/${movie.id}`}>{movie.title}</Link>
            </h3>
            <div className="short-metas">
              <Link to={`/director/${movie.director}`}>{movie.director}</Link> | comments | {views} views
            </div>
            <div className="short-date">{movie.year_of_issue}</div>
          </div>
          <div className="short-inner">
            <div className="short-img">
              <img src={movie.image} alt={movie.title} />
            </div>
            <div className="short-info">
              <div className="short-rate-qual"></div>
              <div className="short-info-item">
                <ul className="mov-lines">
                  <li>
                    <b>Год выпуска:</b> {movie.year_of_issue}
                  </li>
                  <li>
                    <b>Жанр:</b> {movie.genre}
                  </li>
                  <li>
                    <b>Эпизоды:</b> {movie.episodes}
                  </li>
                  <li>
                    <b>Продолжительность:</b> {movie.duration}
                  </li>
                  <li>
                    <b>Режиссёр:</b> {movie.director}
                  </li>
                  <li>
                    <b>Возрастное ограничение:</b> {movie.age_limit}
                  </li>
                  <li>
                    <b>Описание:</b> {movie.description}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="short-bottom">
            <Link to="/">
              <IoPricetags /> Новости сайта
            </Link>
          </div>
          <div className="singlepage-movie">
            <iframe
              width="680"
              height="400"
              src={movie.movie}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <h3 id="mov-sub">{movie.title}</h3>
            <div className="donate-but">
              <button>Поддержать сайт !</button>
            </div>
          </div>
          <CommentApp />
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
};

export default MoviePage;
