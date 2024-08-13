import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import './styles/app.css'
import { router } from './routes'

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App
