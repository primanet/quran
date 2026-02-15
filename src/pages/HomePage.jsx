import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Surah from '../components/Surah'
import Footer from '../components/Footer'
import Layout from '../ui/Layout'
import { Link } from 'react-router-dom'
import { AiOutlineClockCircle, AiOutlineArrowRight } from 'react-icons/ai'

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [lastRead, setLastRead] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('quran_last_read');
    if (saved) {
      setLastRead(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onSearch={setSearchQuery} />
      <main className="flex-grow">
        <div className='max-w-7xl mx-auto px-6 pt-12 text-center pb-8'>
          <h2 className='text-4xl md:text-5xl font-bold text-slate-100 mb-4'>
            Baca Al-Quran <span className='text-emerald-500'>Kapan Saja</span>
          </h2>
          <p className='text-slate-400 text-lg max-w-2xl mx-auto'>
            Temukan ketenangan dengan membaca Al-Qur'an melalui aplikasi digital kami yang bersih dan mudah digunakan.
          </p>

          {/* Last Read Section */}
          {lastRead && (
            <div className="mt-10 max-w-md mx-auto">
              <Link to={`/surah/${lastRead.surahId}`} className="group block">
                <div className="relative overflow-hidden glass border border-emerald-500/30 p-5 rounded-2xl flex items-center justify-between hover:border-emerald-500 transition-all shadow-lg shadow-emerald-500/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <AiOutlineClockCircle size={24} />
                    </div>
                    <div className="text-left">
                      <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Terakhir Dibaca</p>
                      <h3 className="text-slate-100 font-bold text-lg">{lastRead.surahName}</h3>
                      <p className="text-slate-400 text-sm">Ayat ke-{lastRead.verseNumber}</p>
                    </div>
                  </div>
                  <AiOutlineArrowRight className="text-emerald-500 transform group-hover:translate-x-1 transition-all" size={20} />

                  {/* Decorative background gradient */}
                  <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none"></div>
                </div>
              </Link>
            </div>
          )}
        </div>

        <Layout>
          <Surah searchQuery={searchQuery} />
        </Layout>
      </main>
      <Footer />
    </div>
  )
}

export default HomePage