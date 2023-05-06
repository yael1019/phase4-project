import { Routes, Route, useNavigate } from 'react-router-dom'
import Homepage from './Homepage'
import Navbar from './Navbar'
import Category from './Category'
import Profile from './Profile'
import NoMatch from './NoMatch'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/categories' element={<Category />} />
        {/* add /:id to the users so it takes you to the specific users page */}
        <Route path='/users' element={<Profile />} />
        <Route path='*' element={<NoMatch />}/>
      </Routes>
    </div>
  );
}

export default App;
