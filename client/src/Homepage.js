import React from 'react'
import ArticlePage from './ArticlePage'

function Homepage({articles}) {
    const mappedAtricles = articles.map(article => <ArticlePage key={article.id} article={article} />)
    return (
        <div>
            <h1>Home</h1>
            <div id='article-container'>
            {mappedAtricles}
            </div>
        </div>
    )
}

export default Homepage