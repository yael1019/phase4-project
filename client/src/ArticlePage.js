import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArticlePara from './ArticlePara';
import './ArticlePage.css';


function ArticlePage({ currentUser, articles, setArticles }) {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`/articles/${id}`)
      .then(resp => resp.json())
      .then(data => setArticle(data));
  }, [id]);

  function handleClick() {
    console.log('Delete')
    fetch(`/articles/${id}`, {
      method: 'DELETE'
    })
    navigate('/users/')
    const newArticles = articles.filter(art => art.id !== parseInt(id))
    console.log(newArticles)
    console.log(id)
    setArticles(newArticles)
  }


  return (
    <div className='article-container'>
      {article ? (
        <div>
          {
            article.user === currentUser?.name
              ?
              (
                <div>
                  <h2>{article.title}</h2>
                  <h4>By: {article.user}</h4>
                  <div>
                    { 
                      article && (
                        article.text.split('\n').map(para => {
                          return <ArticlePara para={para}/>
                        })
                      )
                    }
                  </div>
                  <button className='article-button' onClick={handleClick}>Delete Article</button>
                </div>
              )
              :
              (
                <div>
                  <h2>{article.title}</h2>
                  <h4>By: {article.user}</h4>
                  <div>
                    { 
                      article && (
                        article.text.split('\n').map(para => {
                          return <ArticlePara para={para}/>
                        })
                      )
                    }
                  </div>
                </div>
              )
          }
        </div>
      ) :
        navigate('/nomatch')
      }
    </div>
);
}

export default ArticlePage;
