import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';

const App = () => {
  return <>
  <Router>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route element={<ProtectedRoute/>}>
        <Route path='/home' element={<Home/>}/>
      </Route>
    </Routes>
  </Router>
  </>
}

export default App