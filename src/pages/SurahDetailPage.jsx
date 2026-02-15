import React, { useState } from 'react'
import Header from '../components/Header'
import Layout from '../ui/Layout'
import SurahDetail from '../components/SurahDetail'
import Footer from '../components/Footer'

function SurahDetailPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Layout>
          <SurahDetail />
        </Layout>
      </main>
      <Footer />
    </div>
  )
}

export default SurahDetailPage