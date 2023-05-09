import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Homepage from './Homepage'
import Navbar from './Navbar'
import CategoryPage from './CategoryPage'
import Profile from './Profile'
import NoMatch from './NoMatch'

function App() {
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/articles')
      .then(resp => resp.json())
      .then(data => setArticles(data))
  }, [])

  useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then(resp => resp.json())
      .then(data => setCategories(data))
  }, [])

  return (
    <div>
      <Navbar setCategory={setCategory} />
      <Routes>
        <Route path='/' element={<Homepage articles={articles} category={category}/>} />
        <Route path='/categories' element={<CategoryPage categories={categories} setCategory={setCategory}/>} />
        {/* add /:id to the users so it takes you to the specific users page */}
        <Route path='/users' element={<Profile />} />
        <Route path='*' element={<NoMatch />}/>
      </Routes>
    </div>
  );
}

export default App;
