import React from 'react'
import CategoryCard from './CategoryCard'

function CategoryPage({categories, setCategory}) {
  const mappedCategories = categories.map(categoryProp => <CategoryCard key={categoryProp.id} categoryProp={categoryProp} setCategory={setCategory} />)
  return (
    <div id='article-container'>
      {mappedCategories}
    </div>
  )
}

export default CategoryPage