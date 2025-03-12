import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";

import News from "./Components/News";
import Header from "./Components/Header";

import "./index.css";

import { HEADLILNES, TOKEN } from "./Utils/API";

const App = () => {
  const [active, setActive] = useState("breaking-news");
  const [articles, setArticles] = useState([]);

  const handleCatClick = (category) => {
    setActive(category);
  };

  // Replace Array.prototype.rotate with a helper function
  const rotateTokens = () => {
    const firstToken = TOKEN.shift();
    TOKEN.push(firstToken);
  };

  // Wrap in useCallback to avoid missing dependency warning
  const fetchNews = useCallback(async () => {
    let response;
    let count = 0;
    try {
      response = await fetch(`${HEADLILNES}&token=${TOKEN[0]}&topic=${active}`);
      while (response.status === 429 || response.status === 401) {
        rotateTokens();
        count += 1;
        if (count === TOKEN.length - 1) {
          throw new Error("maximum limit reached");
        }
        response = await fetch(
          `${HEADLILNES}&token=${TOKEN[0]}&topic=${active}`
        );
      }
      response = await response.json();
      setArticles(response.articles);
    } catch (e) {
      alert(e);
    }
  }, [active]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <div>
      <Header handleCatClick={handleCatClick} />
      {articles.length > 0 && <News articles={articles} />}
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
