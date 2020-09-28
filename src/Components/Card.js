import React from 'react';

function Card(props) {
  const article = props.article;

  return (
    <div className="m-4 w-64  rounded-md shadow-xl hover:shadow-none  flex flex-col">
      <img className="h-32 h-32 w-full mb-2 rounded-md" src={article.urlToImage} alt={article.title}/>
      <div className="font-semibold h-16 overflow-hidden p-2 rounded-t-md text-gray-900">
        {article.title.slice(0, 58) + "..."}
      </div>
      <div className="rounded-t-lg h-32 overflow-hidden p-2 bg-blue-200">
        {article.description.slice(0, 137) + "..."}
      </div>
    </div>
  );
}

export default Card;
