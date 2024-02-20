  // HomeMovies.jsx
  import React, { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import { IoPricetags } from "react-icons/io5";
  import data from "../server/db.json";
  import "../MoviePage/style.css";

  const HomeMovies = () => {
      
    const [moviesData, setMoviesData] = useState(() => {
      // Используем функцию обратного вызова для инициализации состояния из LocalStorage
      const localData = localStorage.getItem("moviesData");
      return localData ? JSON.parse(localData) : data.data.movies;
    });

    useEffect(() => {
      // Сохраняем состояние в LocalStorage при изменении moviesData
      localStorage.setItem("moviesData", JSON.stringify(moviesData));
    }, [moviesData]);

    const handleViewClick = (id) => {
      // Обновление просмотров при клике на просмотр
      setMoviesData((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === id ? { ...movie, views: movie.views + 1 } : movie
        )
      );
    };

    return (
      <div>
        {moviesData.map((item, index) => (
          <div className="short-item " key={index}>
            <div className="short-head">
              <h3>
                <Link to={`/${item.id}`}>{item.title}</Link>
              </h3>
              <div className="short-metas">
                <Link to={`/director/${item.director}`}>{item.director}</Link> | commets | {item.views} views
              </div>
              <div className="short-date">{item.year_of_issue}</div>
            </div>
            <div className="short-inner">
              <div className="short-img">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="short-info">
                <div className="short-rate-qual"></div>
                <div className="short-info-item">
                  <ul className="mov-lines">
                    <li>
                      <b>Год выпуска:</b> {item.year_of_issue}
                    </li>
                    <li>
                      <b>Жанр:</b> {item.genre}
                    </li>
                    <li>
                      <b>Эпизоды:</b> {item.episodes}
                    </li>
                    <li>
                      <b>Продолжительность:</b> {item.duration}
                    </li>
                    <li>
                      <b>Режиссёр:</b> {item.director}
                    </li>
                    <li>
                      <b>Возрастное ограничение:</b> {item.age_limit}
                    </li>
                    <li>
                      <b>Описание:</b> {item.description}
                    </li>
                  </ul>
                </div>
              </div>{" "}
              <Link to={`/${item.id}`}>
                <button
                  className="short-but"
                  onClick={() => handleViewClick(item.id)}
                >
                  Смотреть далее
                </button>
              </Link>
            </div>
            <div className="short-bottom">
              <Link to="/">
                <IoPricetags /> Новости сайта
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  };

  export default HomeMovies;
