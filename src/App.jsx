import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import HomePage from "./pages/HomePage"
import SurahDetailPage from "./pages/SurahDetailPage"
import ErrorPage from "./pages/ErrorPage"
import TasbihPage from "./pages/TasbihPage"
import JadwalSholatPage from "./pages/JadwalSholatPage"
import SettingsPage from "./pages/SettingsPage"
import BottomNav from "./components/BottomNav"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/surah/:id" element={<SurahDetailPage />} />
          <Route path="/tasbih" element={<TasbihPage />} />
          <Route path="/jadwal-sholat" element={<JadwalSholatPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </>
  )
}

export default App
