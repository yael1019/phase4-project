import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`/articles/${id}`)
      .then(resp => resp.json())
      .then(data => setArticle(data));
  }, [id]);

  return (
    <div>
      {article ? (
        <div>
          <h2>{article.title}</h2>
          <h4>By: {article.user}</h4>
          <p>{article.text}</p>
        </div>
      ) : 
        navigate('/nomatch')
      }
    </div>
  );
}

export default ArticlePage;
