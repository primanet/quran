import React, { useState, useEffect } from 'react'
import axios from '../api/axios';
import { BsFillPlayFill, BsPauseFill, BsBookmarkFill, BsBookmark } from 'react-icons/bs'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

function SurahDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [surahId, setSurahId] = useState(parseInt(id));
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentVerse, setCurrentVerse] = useState(null);
  const [lastRead, setLastRead] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`/surah/${surahId}`)
      .then((response) => {
        setData(response.data.data);
        setIsLoading(false);

        // Load last read from localStorage
        const saved = localStorage.getItem('quran_last_read');
        if (saved) {
          setLastRead(JSON.parse(saved));
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [surahId])

  const handleBookmark = (verse) => {
    const bookmarkData = {
      surahId: surahId,
      surahName: data.name.transliteration.id,
      verseNumber: verse.number.inSurah,
      timestamp: new Date().getTime()
    };
    localStorage.setItem('quran_last_read', JSON.stringify(bookmarkData));
    setLastRead(bookmarkData);
  };

  const isBookmarked = (verseNumber) => {
    return lastRead && lastRead.surahId === surahId && lastRead.verseNumber === verseNumber;
  };

  const handlePrevClick = () => {
    if (surahId > 1) {
      const newId = surahId - 1;
      setSurahId(newId);
      navigate(`/surah/${newId}`);
      window.scrollTo(0, 0);
    }
  };

  const handleNextClick = () => {
    if (surahId < 114) {
      const newId = surahId + 1;
      setSurahId(newId);
      navigate(`/surah/${newId}`);
      window.scrollTo(0, 0);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto pb-20">
      {/* Surah Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-800 p-8 md:p-12 mb-12 shadow-2xl shadow-emerald-900/20">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{data.name?.transliteration?.id}</h1>
            <p className="text-emerald-100 text-lg opacity-90">{data.name?.translation?.id} • {data.numberOfVerses} Ayat • {data.revelation?.id}</p>
          </div>
          <div className="text-6xl md:text-7xl font-arab text-white/90">
            {data.name?.short}
          </div>
        </div>
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Tafsir Brief */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 mb-12">
        <h3 className="text-emerald-400 font-bold mb-3 uppercase tracking-wider text-sm">Tentang Surah</h3>
        <p className='text-slate-300 leading-relaxed text-justify'>{data.tafsir?.id}</p>
      </div>

      {/* Verses List */}
      <ul className='flex flex-col gap-8'>
        {data.verses?.map((item) => (
          <li
            id={`verse-${item.number.inSurah}`}
            className={`group relative border transition-all rounded-3xl p-6 md:p-8 ${isBookmarked(item.number.inSurah) ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-slate-800/20 hover:bg-slate-800/40 border-slate-700/50 hover:border-emerald-500/30'}`}
            key={item.number.inSurah}
          >
            <div className='flex items-center justify-between mb-8 pb-4 border-b border-slate-700/30'>
              <div className='flex items-center gap-4'>
                <div className='w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-500 font-bold'>
                  {item.number.inSurah}
                </div>
                {currentVerse === item.number.inSurah ? (
                  <button
                    className='w-10 h-10 bg-emerald-500 text-white rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20 transition-all'
                    onClick={() => setCurrentVerse(null)}
                  >
                    <BsPauseFill size={24} />
                    <audio src={item.audio.primary} autoPlay onEnded={() => setCurrentVerse(null)}></audio>
                  </button>
                ) : (
                  <button
                    className='w-10 h-10 bg-slate-700 hover:bg-emerald-500 text-white rounded-lg flex items-center justify-center transition-all'
                    onClick={() => setCurrentVerse(item.number.inSurah)}
                  >
                    <BsFillPlayFill size={24} />
                  </button>
                )}
              </div>

              <button
                onClick={() => handleBookmark(item)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${isBookmarked(item.number.inSurah) ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-slate-700 text-slate-400 hover:border-emerald-500 hover:text-emerald-500'}`}
              >
                {isBookmarked(item.number.inSurah) ? (
                  <>
                    <BsBookmarkFill size={18} />
                    <span className="text-sm font-semibold">Tandai Dibaca</span>
                  </>
                ) : (
                  <>
                    <BsBookmark size={18} />
                    <span className="text-sm font-semibold text-transparent group-hover:text-emerald-500">Tandai Dibaca</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-right mb-8">
              <h5 className='font-arab text-4xl md:text-5xl leading-[1.8] text-slate-100 tracking-wide'>
                {item.text?.arab}
              </h5>
            </div>

            <div className="space-y-4">
              <p className='text-emerald-400/80 italic font-medium leading-relaxed leading-6'>{item.text?.transliteration?.en}</p>
              <p className='text-slate-300 leading-relaxed text-lg'>{item.translation?.id}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Navigation */}
      <div className='mt-16 flex items-center justify-between gap-4'>
        <button
          onClick={handlePrevClick}
          disabled={surahId <= 1}
          className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all ${surahId <= 1 ? 'border-slate-800 text-slate-600 cursor-not-allowed' : 'border-slate-700 text-slate-300 hover:border-emerald-500 hover:text-emerald-500'}`}
        >
          <AiOutlineArrowLeft />
          <span className="font-semibold">Sebelumnya</span>
        </button>

        <Link to="/" className="text-slate-500 hover:text-emerald-500 transition-colors font-medium">Beranda</Link>

        <button
          onClick={handleNextClick}
          disabled={surahId >= 114}
          className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all ${surahId >= 114 ? 'border-slate-800 text-slate-600 cursor-not-allowed' : 'border-slate-700 text-slate-300 hover:border-emerald-500 hover:text-emerald-500'}`}
        >
          <span className="font-semibold">Selanjutnya</span>
          <AiOutlineArrowRight />
        </button>
      </div>
    </article>
  )
}

export default SurahDetail