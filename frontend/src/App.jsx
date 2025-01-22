import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import ChatContainer from './components/ChatContainer'
import Login from './components/LandingPage'

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Login/>
  },
  {
    path:'/chat',
    element:<ChatContainer/>
  },
])


function App() {
 

  return (
  <main>
  <RouterProvider router={appRouter}/>
  
  </main>
  )
}

export default App
