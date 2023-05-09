import React from 'react';
import { Link } from 'react-router-dom';

function HomepageCard({article}) {
  return (
    <div className='article-row'>
        <h2>
          <Link to={`/article/${article.id}`}>
            {article.title}
          </Link>
        </h2>
        <h4>By: {article.user}</h4>
        <p>{article.text.substring(0, 250)}. . .</p>
    </div>
  );
}

export default HomepageCard;
