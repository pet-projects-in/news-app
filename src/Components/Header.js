import React, { useState } from "react";

const CATEGORIES = [
  "breaking-news",
  "business",
  "world",
  "nation",
  "sports",
  "technology",
  "health",
  "science",
  "entertainment",
];

const Header = (props) => {
  const [active, setActive] = useState("breaking-news");

  const activeClass = "bg-blue-200 rounded-sm p-2";
  const inActiveClass = "cursor-pointer px-2";

  const onCategoryClick = (e) => {
    setActive(e.target.textContent);
    props.handleCatClick(e.target.textContent);
  };

  return (
    <div className="flex flex-wrap flex-row bg-blue-100 h-auto text-lg uppercase items-center justify-around">
      {CATEGORIES.map((category) => (
        <div
          key={category}
          className={active === category ? activeClass : inActiveClass}
          onClick={onCategoryClick}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default Header;
