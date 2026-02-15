import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

function Header({ onSearch }) {
  const [input, setInput] = useState('');

  const handleSearch = (event) => {
    const value = event.target.value;
    setInput(value);
    if (onSearch) {
      onSearch(value);
    }
  }

  return (
    <header className='sticky top-0 z-50 glass shadow-lg'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-4'>
        <Link to={'/'} className='flex items-center gap-2 group'>
          <div className='w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform'>
            <span className='text-white font-bold text-xl'>Q</span>
          </div>
          <h1 className='text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent'>
            Al Qur'an <span className='text-emerald-500'>Indonesia</span>
          </h1>
        </Link>

        <div className='relative w-full md:w-96 group'>
          <AiOutlineSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors' size={20} />
          <input
            value={input}
            onChange={handleSearch}
            className='w-full pl-12 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-slate-200 placeholder:text-slate-500'
            placeholder='Cari surah (contoh: Al-Fatihah)...'
            type="text"
          />
        </div>
      </div>
    </header>
  )
}

export default Header
