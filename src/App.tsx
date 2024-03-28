import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Posts from './components/Posts/Posts'
import CreatePost from './components/CreatePost/CreatePost'
import PostPage from './components/PostPage/PostPage'

import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/"  Component={Posts} />
            <Route path="/posts/new" Component={CreatePost} />
            <Route path="/posts/:id" Component={PostPage} />
          </Routes>       
      </BrowserRouter>
    </>
  )
}

export default App
