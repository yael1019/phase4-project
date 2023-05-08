import React from 'react'

function ArticlePage({article}) {
  return (
    <div className='article-row'>
        <h2>{ article.title }</h2>
        <h4>By: { article.user }</h4>
    </div>
  )
}

export default ArticlePage