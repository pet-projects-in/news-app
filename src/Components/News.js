import React from 'react';

import Card from './Card';

function News({ articles }) {
  const ifArticleComplete = (article) => {
    return article.image && article.title && article.description ? true : false;
  };

  return (
    <div className='flex flex-row flex-wrap justify-center'>
      {articles.map((article, index) => {
        return (
          ifArticleComplete(article) && <Card article={article} key={index} />
        );
      })}
    </div>
  );

}

export default News;
