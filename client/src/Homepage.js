import React from 'react'
import HomepageCard from './HomepageCard'

function Homepage({articles, category}) {
    const filterArticles = articles.filter(article => article.category_id === category || category === null)
    const mappedArticles = filterArticles.map(article => <HomepageCard key={article.id} article={article} />)
    
    return (
        <div>
            <div id='article-container'>
            {mappedArticles}
            </div>
        </div>
    )
}

export default Homepage