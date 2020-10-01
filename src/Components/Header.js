import React, {useState} from "react";

const CATEGORIES = ["breaking-news", "business", "world", "nation", "sports", "technology", "health", "science", "entertainment"];

const Header = (props) => {
  const [active, setActive] = useState('breaking-news');

  const activeClass = "bg-blue-200 rounded-lg p-2";
  const inActiveClass = "cursor-pointer";

  const onCategoryClick = (e) => {
    setActive(e.target.textContent);
    props.handleCatClick(e.target.textContent)
  }

  return(
    <div className="flex bg-blue-100 h-16 px-4 text-lg uppercase items-center justify-around">
      {
        CATEGORIES.map(category => (
          <div key={category} className={active === category ? activeClass : inActiveClass} onClick={onCategoryClick}>{category}</div>
        ))
      }
    </div>
  )
}

export default Header;
