import { Link, Route, Routes } from 'react-router-dom';
import Home from './assets/pages/Home';
import People from './assets/pages/People';



function App() {

  return (
    <>
      <Routes>
        <Route path='*' element={
          <>
            <Link to="/people">People</Link>
            <Link to="/">Home</Link>
          </>
        }/>
      </Routes>
      
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/people' element={ <People /> } />
      </Routes>
    </>

  )
}

export default App
