import React, { useState, useEffect } from 'react';
import Statistics from './Statistics';
import './style.css';

const data = [
  {
    question: "Какие жанры фильмов вы предпочитаете?",
    options: ["Боевик", "Драма", "Комедия", "Фантастика", "Триллер"],
  },
  {
    question: "Как вы относитесь к сериалам?",
    options: ["Обожаю", "Иногда смотрю", "Не интересно", "Предпочитаю фильмы", "Не смотрю вообще"],
  },
  {
    question: "Что важнее для вас в фильме?",
    options: ["Сюжет", "Актерская игра", "Визуальные эффекты", "Музыка и звук", "Режиссура"],
  },
  {
    question: "Как часто вы посещаете кинотеатры?",
    options: ["Регулярно", "Иногда", "Очень редко", "Почти никогда", "Не посещаю"],
  },
  {
    question: "Какие кинематографические награды вы считаете наиболее престижными?",
    options: ["Оскар", "Золотой глобус", "Каннский кинофестиваль", "Сезар", "Берлинсал"],
  },
];

const Voting = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [votes, setVotes] = useState([]);

  const currentData = data[currentQuestionIndex];

  const handleVote = (option) => {
    setSelectedOption(option);
  };

  const handleVoteButtonClick = () => {
    if (selectedOption) {
      const userVote = {
        question: currentData.question,
        option: selectedOption,
      };

      setVotes((prevVotes) => [...prevVotes, userVote]);
      setSelectedOption(null);

      if (currentQuestionIndex === data.length - 1) {
        // Если это последний опрос, отправляем все голоса на сервер
        setCompleted(true);
      } else {
        // Если не последний опрос, переходим к следующему
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  useEffect(() => {
    if (completed) {
      // Отправляем все голоса на сервер
      fetch('https://65799e161acd268f9af9874a.mockapi.io/Votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ votes }),
      })
        .then(() => {
          setVotes([]); // Очищаем голоса в стейте после отправки на сервер
        })
        .catch((error) => console.error('Error posting votes:', error));
    }
  }, [completed, votes]);

  return (
    <div className="Voting">
      <h3>Опрос</h3>
      {!completed && currentData ? (
        <div className='voting-form'>
          <p>{currentData.question}</p>
          <form>
            {currentData.options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="option"
                  value={option}
                  onChange={() => handleVote(option)}
                  checked={selectedOption === option}
                />
                {option}
              </label>
            ))}
          </form>
          <button onClick={handleVoteButtonClick} disabled={!selectedOption}>
            Голосовать
          </button>
        </div>
      ) : (
        <Statistics />
      )}
    </div>
  );
};

export default Voting;
