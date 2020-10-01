import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css';
import News from './Components/News';
import Header from './Components/Header'
import * as serviceWorker from './serviceWorker';
import Axios from 'axios';

import { HEADLILNES, TOKEN } from "./Utils/API";

const App = () => {
  const [active, setActive] = useState('breaking-news');
  const [articles, setArticles] = useState([]);
  const handleCatClick = (category) => {
    setActive(category);
  }
  const fetchNews = async () => {
    let response;
    let count = 0;
    try{
      response = await fetch(`${HEADLILNES}&token=${TOKEN[0]}&topic=${active}`);
      while(response.status === 429 || response.status === 401){
        Array.prototype.rotate = function(n) {
          while (this.length && n < 0) n += this.length;
          this.push.apply(this, this.splice(0, n));
          return this;
        }
        TOKEN.rotate(1);
        count += 1;
        if(count == TOKEN.length - 1){
          throw "maximum limit reached";
        }
        response = await fetch(`${HEADLILNES}&token=${TOKEN[0]}&topic=${active}`);
      }
    } catch(e){
      alert(e);
    }
    response = await response.json();
    setArticles(response.articles);
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
