import './App.css'
import { BrowserRouter , Routes , Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ToolsPage from './pages/ViewToolsPage'



function App() {

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/view-tools" element={<ToolsPage />} />
      </Routes>
   </BrowserRouter>
  )
}

export default App
