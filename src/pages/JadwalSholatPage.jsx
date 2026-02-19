import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineSearch, AiOutlineEnvironment } from 'react-icons/ai';
import axios from 'axios';
import Footer from '../components/Footer';

function JadwalSholatPage() {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState({ id: '1301', lokasi: 'KOTA JAKARTA' });
    const [searchCity, setSearchCity] = useState('');
    const [schedule, setSchedule] = useState(null);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        // Load saved city
        const savedCity = localStorage.getItem('sholat_city');
        if (savedCity) {
            setSelectedCity(JSON.parse(savedCity));
        }

        // Fetch cities list
        axios.get('https://api.myquran.com/v2/sholat/kota/semua')
            .then(res => setCities(res.data.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (selectedCity) {
            setLoading(true);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            axios.get(`https://api.myquran.com/v2/sholat/jadwal/${selectedCity.id}/${year}/${month}/${day}`)
                .then(res => {
                    setSchedule(res.data.data.jadwal);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });

            localStorage.setItem('sholat_city', JSON.stringify(selectedCity));
        }
    }, [selectedCity, date]);

    const filteredCities = cities.filter(city =>
        city.lokasi.toLowerCase().includes(searchCity.toLowerCase())
    ).slice(0, 10);

    const prayerIcons = {
        imsak: '🌑',
        subuh: '🌅',
        terbit: '🌞',
        dhuha: '🌤️',
        dzuhur: '☀️',
        ashar: '🌥️',
        maghrib: '🌇',
        isya: '🌃'
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-950">
            <header className="sticky top-0 z-50 glass shadow-lg">
                <div className="max-w-7xl mx-auto flex items-center px-6 py-4 gap-4">
                    <Link to="/" className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-100">
                        <AiOutlineArrowLeft size={24} />
                    </Link>
                    <h1 className="text-xl font-bold text-slate-100">Jadwal Sholat</h1>
                </div>
            </header>

            <main className="flex-grow max-w-4xl mx-auto w-full p-6 space-y-8">
                {/* City Selector */}
                <div className="space-y-4">
                    <div className="relative group">
                        <AiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Cari Kota/Kabupaten..."
                            value={searchCity}
                            onChange={(e) => setSearchCity(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-slate-100"
                        />
                    </div>

                    {searchCity && filteredCities.length > 0 && (
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                            {filteredCities.map(city => (
                                <button
                                    key={city.id}
                                    onClick={() => {
                                        setSelectedCity(city);
                                        setSearchCity('');
                                    }}
                                    className="w-full px-6 py-3 text-left hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-400 transition-colors border-b border-slate-800 last:border-0"
                                >
                                    {city.lokasi}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Current Location Info */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass p-6 rounded-3xl border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <AiOutlineEnvironment size={32} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-100">{selectedCity.lokasi}</h2>
                            <p className="text-emerald-500 font-medium">{schedule?.tanggal || 'Memuat...'}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-slate-400 text-sm">Waktu Wilayah</p>
                        <p className="text-slate-100 font-bold">{new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</p>
                    </div>
                </div>

                {/* Prayer Times Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : schedule && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['imsak', 'subuh', 'terbit', 'dhuha', 'dzuhur', 'ashar', 'maghrib', 'isya'].map((time) => (
                            <div key={time} className="glass p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all group">
                                <div className="text-3xl mb-2 grayscale group-hover:grayscale-0 transition-all">{prayerIcons[time]}</div>
                                <p className="text-slate-400 text-sm uppercase font-bold tracking-widest">{time}</p>
                                <p className="text-2xl font-black text-slate-100 mt-1">{schedule[time]}</p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default JadwalSholatPage;
