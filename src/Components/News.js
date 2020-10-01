import React from "react";

import Card from "./Card";

import Header from "./Header";

function News({articles}) {

  const ifArticleComplete = (article) => {
    return article.image && article.title && article.description
      ? true
      : false;
  };

  return (
    <div className='flex flex-row flex-wrap'>
      {articles.map((article, index) => {
        return (
          ifArticleComplete(article) && <Card article={article} key={index} />
        );
      })}
    </div>
  );

  return(
    <div>
      <Header/>
    </div>
  )
}

export default News;
