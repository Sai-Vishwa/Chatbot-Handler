import { useState } from 'react'
import './App.css'
import { BrowserRouter , Routes , Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ChatbotPage from './pages/BotPage'


function App() {

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/bot" element={<ChatbotPage />}/>
      </Routes>
   </BrowserRouter>
  )
}

export default App
