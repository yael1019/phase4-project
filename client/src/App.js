import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Homepage from './Homepage'
import Navbar from './Navbar'
import Category from './Category'
import Profile from './Profile'
import NoMatch from './NoMatch'
import Login from './Login'
import CreateAccount from './CreateAccount'
import ArticlePage from './ArticlePage'

function App() {
  const [articles, setArticles] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/articles')
      .then(resp => resp.json())
      .then(data => setArticles(data))
  }, [])

  useEffect(() => {
    fetch('/check_session')
      .then(res => {
        if (res.ok){
          res.json()
          .then(data => setCurrentUser(data))
        }
      })
  }, [])

  function handleCreateAccount(form) {
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (res.ok) {
          res.json()
          .then(data => setCurrentUser(data))
        }
      })
  }

  function handleLogin(form) {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(form)
    })
    .then(res => {
      if (res.ok) {
      res.json()
      .then(data => setCurrentUser(data))
      navigate('/')
      } else {
        res.json()
        .then(data => alert(data.Message))
      }
    })
  }

  function handleLogout() {
    fetch('/logout', {
      method: 'DELETE'
    })
    setCurrentUser(null)
  }

  return (
    <div>
      <Navbar handleLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<Homepage articles={articles} currentUser={currentUser} />} />
        <Route path='/categories' element={<Category />} />
        {/* add /:id to the users so it takes you to the specific users page */}
        <Route path='/users' element={<Profile />} />
        <Route path='/login' element={<Login handleLogin={handleLogin}/>} />
        <Route path='/createAccount' element={<CreateAccount handleCreateAccount={handleCreateAccount} />} />
        <Route path='/article/:id' element={<ArticlePage articles={articles} />} /> 
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
