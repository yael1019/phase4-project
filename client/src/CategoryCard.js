import React from 'react'
import { useNavigate } from 'react-router-dom'

function CategoryCard({categoryProp, setCategory}) {

    const navigate = useNavigate()

    function handleClick() {
        setCategory(categoryProp.id)
        navigate("/")
    }
    
  return (
    <div className='article-row'>
        <h2 id='Category-Name-btn' onClick={handleClick}>{categoryProp.name}</h2>
    </div>
  )
}

export default CategoryCard