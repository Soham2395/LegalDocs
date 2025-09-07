// App.jsx - Update your existing file with this structure

import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Header from './components/Header.jsx'
import WillForm from './pages/WillForm.jsx'
import PoAForm from './pages/PoAForm.jsx'
import Home from './pages/Home.jsx'

export default function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  if (isHomePage) {
    return (
      <div className="min-h-screen w-screen">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen flex bg-gradient-to-br from-slate-50 to-slate-100 overflow-x-hidden">
        <main className="flex-1 w-full min-w-0 overflow-auto">
          <Routes>
            <Route path="/will" element={<WillForm />} />
            <Route path="/poa" element={<PoAForm />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
    </div>
  )
}