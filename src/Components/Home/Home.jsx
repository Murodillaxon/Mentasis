import React, { useState } from "react";
import "./style.css";
import { Link, Route, Routes } from "react-router-dom";
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

const Home = () => {

  const [siteLoc, SetSiteLoc] = useState('')

  return (
    <>
    <div className="Home">
      <div className="site-loc">
        <Link to={"/"}>
          <FaLocationDot /> Смотреть фильм{" "}
        </Link>
        {siteLoc}
      </div>

      <div className="films_date">
        <ul>
            <li> <Link to={'/2016'}>2016 Год</Link></li>
          <li>2017 Год</li>
          <li>2018 Год</li>
          <li>2019 Год</li>
          <li><Link to={'/2020'}>2020 Год</Link></li>
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
              <button>2016</button>
              <button>2017</button>
              <button>2018</button>
              <button>2019</button>
              <button>2020</button>
            </ul>
          </div>
        </div>
        <div className="General">
          <div className="Search">
            <input type="text" placeholder="Поиск по Фильмам" />
            <button>Найти</button>
          </div>
          <Routes>
            <Route path="/" element={<HomeMovies />} />
            <Route path="/:id" element={<MoviePage  setSiteLoc={SetSiteLoc}/>} />
            <Route path="/2016" element={<Page2016 setSiteLoc={SetSiteLoc}/>} />
            <Route path="/2020" element={<Page2020 />} />
            <Route path="/director/:directorName" element={<DirectorPage/>} />
          </Routes>
        </div>
        <div className="info-site">
          <div className="info-box">
            <h3>Информация</h3>
            <p>
              Доброго времени суток! <br /> Старый сайт был заблокирован по
              решению суда, так что придется создавать все с самого начала.
              Постараюсь добавлять новые публикации хентая каждый день. Спасибо
              что остаетесь с нами!
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
