import React from 'react'
import CategoryCard from './CategoryCard'
import Travel from './CategoryImages/Travel.jpg';
import Cooking from './CategoryImages/Cooking.jpg';
import Sports from './CategoryImages/Sports.jpg';
import Tech from './CategoryImages/Tech.jpg';
import Business from './CategoryImages/Business.jpg';
import Money from './CategoryImages/Money.jpg';

function CategoryPage({setCategory}) {
  const categories = [
    {
        id: 1,
        name: 'Travel',
        imageUrl: Travel
    },
    {
        id: 2,
        name: 'Cooking',
        imageUrl: Cooking
    },
    {
        id: 3,
        name: 'Sports',
        imageUrl: Sports
    },
    {
        id: 4,
        name: 'Tech',
        imageUrl: Tech
    },
    {
        id: 5,
        name: 'Money',
        imageUrl: Money
    },
    {
        id: 6,
        name: 'Business',
        imageUrl: Business
    },
  ];
  
  const mappedCategories = categories.map(categoryProp => <CategoryCard key={categoryProp.id} categoryProp={categoryProp} setCategory={setCategory} />)
  
  return (
    <div id='article-container'>
      {mappedCategories}
    </div>
  )
}

export default CategoryPage
