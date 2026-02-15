import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { AiOutlineArrowRight } from 'react-icons/ai';

function Surah({ searchQuery = '' }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`/surah`)
      .then((response) => {
        setData(response.data.data);
        setFilteredData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item =>
        item.name.transliteration.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.short.includes(searchQuery)
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <article className="pb-10">
      {filteredData.length === 0 ? (
        <div className="text-center py-20 bg-slate-800/20 rounded-3xl border border-slate-800">
          <p className="text-slate-400 text-lg">Surah "{searchQuery}" tidak ditemukan.</p>
        </div>
      ) : (
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredData.map((item) => (
            <li key={item.number}>
              <Link to={`/surah/${item.number}`} className="block group">
                <div className='relative overflow-hidden quran-card border border-slate-800 bg-slate-800/40 p-6 rounded-2xl flex items-center justify-between'>
                  <div className="flex items-center gap-5">
                    <div className='w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500 font-bold group-hover:bg-emerald-500 group-hover:text-white transition-all'>
                      {item.number}
                    </div>
                    <div>
                      <h3 className='text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition-colors'>
                        {item.name.transliteration.id}
                      </h3>
                      <div className='flex items-center gap-2 mt-1'>
                        <span className='text-xs font-medium text-slate-500 uppercase tracking-wider'>{item.revelation.id}</span>
                        <span className='w-1 h-1 bg-slate-700 rounded-full'></span>
                        <span className='text-xs font-medium text-slate-500 uppercase tracking-wider'>{item.numberOfVerses} Ayat</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <h4 className='text-2xl font-arab text-emerald-400'>{item.name.short}</h4>
                    <AiOutlineArrowRight className="text-slate-600 group-hover:text-emerald-500 transform group-hover:translate-x-1 transition-all" size={18} />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default Surah