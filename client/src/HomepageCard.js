import React from 'react'

function HomepageCard({article}) {
  return (
    <div className='article-row'>
        <h2>{ article.title }</h2>
        <h4>By: { article.user }</h4>
        <p>{ article.text.substring(0, 250) }. . .</p>
    </div>
  )
}

export default HomepageCard