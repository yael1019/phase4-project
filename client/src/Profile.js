import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HomepageCard from './HomepageCard'

function Profile({ currentUser }) {
  const navigate = useNavigate()
  if(currentUser){
  // console.log(currentUser, currentUser.articles)
  const articles = currentUser.articles
  const mappedArticles = articles.map(article => <HomepageCard key={article.id} article={article}/>)
  return (
    <div>
      {
        currentUser
        ?
        (
          <div>
            <button onClick={() => navigate('/write')}>✏️Write</button>
            <h1>{currentUser.name}</h1>
            {mappedArticles}
          </div>
        )
        :
        navigate('/nomatch')
      }
    </div>
  )
    }
}

export default Profile