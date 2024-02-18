import React, { useState, useEffect } from "react";

const Statistics = () => {
  const [allVotes, setAllVotes] = useState([]);
  const [colorMap, setColorMap] = useState({});

  useEffect(() => {
    fetch("https://65799e161acd268f9af9874a.mockapi.io/Votes")
      .then((response) => response.json())
      .then((data) => {
        setAllVotes(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Генерация случайного цвета
  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getColor = (question, option) => {
    const key = `${question}-${option}`;
    if (!colorMap[key]) {
      colorMap[key] = generateRandomColor();
      setColorMap({ ...colorMap });
    }
    return colorMap[key];
  };

  const calculateStatistics = () => {
    const statistics = {};

    allVotes.forEach((item) => {
      if (!item.votes) {
        return;
      }

      item.votes.forEach((vote) => {
        if (!statistics[vote.question]) {
          statistics[vote.question] = {};
        }

        if (!statistics[vote.question][vote.option]) {
          statistics[vote.question][vote.option] = 1;
        } else {
          statistics[vote.question][vote.option]++;
        }
      });
    });

    return statistics;
  };

  const calculateTotalVotes = () => {
    return allVotes.reduce(
      (total, item) => (item.votes ? total + item.votes.length : total),
      0
    );
  };

  const calculatePercentages = (question, option) => {
    const totalVotes = Object.values(calculateStatistics()[question]).reduce(
      (acc, count) => acc + count,
      0
    );
    const optionVotes = calculateStatistics()[question][option] || 0;
    return ((optionVotes / totalVotes) * 100 || 0).toFixed(2);
  };

  return (
    <div className="stats">
      <h2>Статистика голосования:</h2>
      {Object.entries(calculateStatistics()).map(([question, options]) => (
        <div key={question}>
          <p>{question}</p>
          <ul>
            {Object.entries(options).map(([option, count]) => (
              <li key={option}>
                {option}: {count} голосов (
                {calculatePercentages(question, option)}%)
                <div
                  style={{
                    width: "100%",
                    boxShadow: "inset 0 0 5px gray",
                    height: "15px",
                    margin: "5px 0",
                    borderRadius: "10px",
                  }}
                >
                  <span
                    style={{
                      width: `${calculatePercentages(
                        question,
                        option
                      )}%`,
                      height: "100%",
                      backgroundColor: getColor(question, option),
                      borderRadius: "5px",
                      display: "block",
                    }}
                  ></span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div>
        <h3>Общее количество голосов: {calculateTotalVotes()}</h3>
      </div>
    </div>
  );
};

export default Statistics;
