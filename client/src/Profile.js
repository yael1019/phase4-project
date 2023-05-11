import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HomepageCard from './HomepageCard'
import './Profile.css' // Don't forget to import the CSS

function Profile({ currentUser }) {
  const navigate = useNavigate()
  if(currentUser){
  let articles = currentUser.articles
  if(!articles) articles = []
  const mappedArticles = articles.map(article => <HomepageCard key={article.id} article={article}/>)
  return (
    <div className='profile-container'>
      {
        currentUser
        ?
        (
          <div className='profile-content'>
            <div className='name-div'>
              <h1>{currentUser.name}</h1>
            </div>
            <button className='write-btn' onClick={() => navigate('/write')}>✏️ Write</button>
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
