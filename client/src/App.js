import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Homepage from './Homepage'
import Navbar from './Navbar'
import Category from './Category'
import Profile from './Profile'
import NoMatch from './NoMatch'

function App() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/articles')
      .then(resp => resp.json())
      .then(data => setArticles(data))
  }, [])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage articles={articles}/>} />
        <Route path='/categories' element={<Category />} />
        {/* add /:id to the users so it takes you to the specific users page */}
        <Route path='/users' element={<Profile />} />
        <Route path='*' element={<NoMatch />}/>
      </Routes>
    </div>
  );
}

export default App;
