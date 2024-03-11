import React from 'react'
import { Router, RouterProvider, createBrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import Posts, {Loader as postsLoader} from './routes/Posts.jsx'
import './index.css'
import NewPost, {action as newPostAction} from './routes/NewPost.jsx'
import RootLayout from './routes/RootLayout.jsx'
import PostDetails, {loader as postDetailsLoader} from './components/postDetails.jsx'

const router = createBrowserRouter([
  {path:'/', element:<RootLayout/>, 
  children:[
    {path:'/', element: <Posts/>, loader: postsLoader,
     children:[
      {path:'/create-post', element:<NewPost />, action:newPostAction},
      {path:'/:postId', element:<PostDetails />, loader:postDetailsLoader}
    ]},
    
  ] }
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
