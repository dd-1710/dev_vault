import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Snippet } from './pages/Snippets'
import { AddSnippet } from './pages/AddSnippet'
import { ProtectedRoutes } from './utils/protectRoute'

function App() {

  return (
    <>
    <Routes>
       <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path='/login' element={<Login/>}></Route>
      <Route element={<ProtectedRoutes/>}>
       <Route path='/snippets' element = {<Snippet/>}/>
      <Route path='/add_snippet' element={<AddSnippet/>}></Route>
      <Route path='/update_snippet/:name/:id' element={<AddSnippet/>}></Route>
      </Route>   
    </Routes>
    </>
  )
}

export default App
