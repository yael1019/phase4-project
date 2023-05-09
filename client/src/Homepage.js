import React from 'react'
import HomepageCard from './HomepageCard'

function Homepage({articles, currentUser}) {
    const mappedAtricles = articles.map(article => <HomepageCard key={article.id} article={article} />)
    return (
        <div>
            <h1>Welcome {currentUser ? currentUser.name : ''}</h1>
            <div id='article-container'>
            {mappedAtricles}
            </div>
        </div>
    )
}

export default Homepage