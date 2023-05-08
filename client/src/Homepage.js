import React from 'react'
import HomepageCard from './HomepageCard'

function Homepage({articles}) {
    const mappedAtricles = articles.map(article => <HomepageCard key={article.id} article={article} />)
    return (
        <div>
            <div id='article-container'>
            {mappedAtricles}
            </div>
        </div>
    )
}

export default Homepage