import React from 'react';

function Card(props) {
  const article = props.article;

  const redirectToSource = () => {
    window.open(props.article.url, '_blank');
  };

  return (
    <div
      className='m-4 w-3/4 md:w-64 rounded-md shadow-xl hover:shadow-xs 
      hover:ring-2 ring-gray-800 cursor-pointer flex flex-col 
      transition duration-300 overflow-hidden'
      onClick={redirectToSource}
    >
      <img
        className='h-32 w-full mb-2 rounded-md'
        src={article.image}
        alt={article.title}
      />
      <div className='font-semibold h-16 overflow-hidden p-2 rounded-t-md text-gray-900'>
        {article.title.slice(0, 50) + '...'}
      </div>
      <div className='rounded-t-lg h-32 overflow-hidden p-2 bg-blue-100 '>
        {article.description.slice(0, 137) + '...'}
      </div>
    </div>
  );
}

export default Card;
