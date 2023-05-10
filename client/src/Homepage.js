import React from 'react'
import HomepageCard from './HomepageCard'
import './Homepage.css'

function Homepage({articles, currentUser, category}) {
    const filterArticles = articles.filter(article => article.category_id === category || category === null)
    const mappedArticles = filterArticles.map(article => <HomepageCard key={article.id} article={article} />)
    return (
        <div>
            <h1>Welcome {currentUser ? currentUser.name : ''}</h1>
            <div id='article-container'>
            {mappedArticles}
            </div>
        </div>
    )
}

export default Homepage