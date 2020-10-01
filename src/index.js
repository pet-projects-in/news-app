import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css';
import News from './Components/News';
import Header from './Components/Header'
import * as serviceWorker from './serviceWorker';
import Axios from 'axios';

import { HEADLILNES } from "./Utils/API";

const App = () => {
  const [active, setActive] = useState('breaking-news');
  const [articles, setArticles] = useState([]);
  const handleCatClick = (category) => {
    setActive(category);
  }
  const fetchNews = async () => {
    const response = await Axios.get(`${HEADLILNES}&topic=${active}`);
    setArticles(response.data.articles);
  };

  useEffect(() => {
    fetchNews();
  }, [active]);

  return(
    <div>
      <Header handleCatClick={handleCatClick}/>
      {articles.length > 0 && <News articles={articles}/> }
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
