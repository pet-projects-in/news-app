import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { HEADLILNES } from '../Utils/API';

import Card from './Card';

function News() {
  const [articles, setArticles] = useState([]);

  const fetchNews = async () => {
    const response = await Axios.get(HEADLILNES);
    setArticles(response.data.articles);
  }

  useEffect(()=> {
    fetchNews();
  }, [])

  const ifArticleComplete = (article) => {
    return((article.urlToImage && article.title && article.description) ? true : false);
  }

  return (
    <div className="flex flex-row flex-wrap">
      {
        articles.map((article, index) => {
          return(ifArticleComplete(article) && <Card article={article} key={index}/>)
        })
      }
    </div>
  );
}

export default News;
