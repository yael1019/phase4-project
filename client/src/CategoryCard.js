import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CategoryCard.css'

function CategoryCard({categoryProp, setCategory}) {
    const navigate = useNavigate()

    function handleClick() {
        setCategory(categoryProp.id)
        navigate("/")
    }
    
    return (
        <div 
            className='article-row' 
            onClick={handleClick} 
            style={{ backgroundImage: `url(${categoryProp.imageUrl})` }}
        >
            <div className='category-name'>{categoryProp.name}</div>
        </div>
    )
}

export default CategoryCard
