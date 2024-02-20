import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { IoArrowRedoSharp } from "react-icons/io5";
import { IoPricetags } from "react-icons/io5";
import MoviePage from "../MoviePage/MoviePage";
import HomeMovies from "./HomeMovies";
import Voting from "../Voting/Voting";
import Page2016 from "../Page2016/Page2016";
import Page2020 from "../Page2020/Page2020";
import DirectorPage from "../DirectorPage/DirectorPage";
import Search from "../Search/Search";
import "./style.css";

const Home = ({ moviesData }) => {
  const [siteLoc, setSiteLoc] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <>
      <div className="Home">
        <div className="site-loc">
          <a href="/">
            <FaLocationDot /> Смотреть фильм{" "}
          </a>
          {siteLoc}
        </div>

        <div className="films_date">
          <ul>
            <li>
              {" "}
              <Link to={"/2016"}>2016 Год</Link>
            </li>
            <li>2017 Год</li>
            <li>2018 Год</li>
            <li>2019 Год</li>
            <li>
              <Link to={"/2020"}>2020 Год</Link>
            </li>
          </ul>
        </div>
        <div className="Generan_Page">
          <div className="filter">
            <div className="Navigation">
              <h3>
                <FaBars /> Навигация
              </h3>
              <ul>
                <li>
                  <IoArrowRedoSharp /> Весь фильм
                </li>
                <li>
                  <IoArrowRedoSharp /> Русская озвучка
                </li>
                <li>
                  <IoArrowRedoSharp /> Поддержать сайт
                </li>
                <li>
                  <IoArrowRedoSharp /> Телеграмм
                </li>
                <li>
                  <IoArrowRedoSharp /> Инстаграм
                </li>
              </ul>
            </div>
            <div className="Tags">
              <h3>
                <IoPricetags /> Теги
              </h3>
              <ul>
                <Link to={"/2016"}>2016</Link>
                <Link to={"/2016"}>2017</Link>
                <Link to={"/2020"}>2018</Link>
                <Link to={"/2020"}>2019</Link>
                <Link to={"/2020"}>2020</Link>
              </ul>
            </div>
          </div>
          <div className="General">
            <div className="Search">
              <input
                type="text"
                placeholder="Поиск по Фильмам"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button onClick={handleSearchClick}>Найти</button>
            </div>
            <Routes>
              <Route path="/" element={<HomeMovies />} />
              <Route
                path="/:id"
                element={<MoviePage setSiteLoc={setSiteLoc} />}
              />
              <Route
                path="/2016"
                element={<Page2016 setSiteLoc={setSiteLoc} />}
              />
              <Route path="/2020" element={<Page2020 />} />
              <Route
                path="/director/:directorName"
                element={<DirectorPage />}
              />
              <Route
                path="/search"
                element={
                  <Search moviesData={moviesData} searchQuery={searchQuery} />
                }
              />
            </Routes>
          </div>
          <div className="info-site">
            <div className="info-box">
              <h3>Информация</h3>
              <p>
                Доброго времени суток! <br /> Старый сайт был заблокирован по
                решению суда, так что придется создавать все с самого начала.
                Постараюсь добавлять новые публикации хентая каждый день.
                Спасибо, что остаетесь с нами!
              </p>
            </div>

            <div className="info-img"></div>

            <Voting />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
