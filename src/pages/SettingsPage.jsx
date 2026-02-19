import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineSave } from 'react-icons/ai';
import Swal from 'sweetalert2';
import Footer from '../components/Footer';

function SettingsPage() {
    const [fontSize, setFontSize] = useState(36); // default 4xl is roughly 36px
    const [showTranslation, setShowTranslation] = useState(true);
    const [showLatin, setShowLatin] = useState(true);

    useEffect(() => {
        const savedSize = localStorage.getItem('quran_font_size');
        if (savedSize) setFontSize(parseInt(savedSize));

        const savedTranslation = localStorage.getItem('quran_show_translation');
        if (savedTranslation !== null) setShowTranslation(savedTranslation === 'true');

        const savedLatin = localStorage.getItem('quran_show_latin');
        if (savedLatin !== null) setShowLatin(savedLatin === 'true');
    }, []);

    const handleSave = () => {
        localStorage.setItem('quran_font_size', fontSize.toString());
        localStorage.setItem('quran_show_translation', showTranslation.toString());
        localStorage.setItem('quran_show_latin', showLatin.toString());

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            background: '#1e293b',
            color: '#f8fafc'
        });
        Toast.fire({
            icon: 'success',
            title: 'Pengaturan berhasil disimpan'
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-950">
            <header className="sticky top-0 z-50 glass shadow-lg">
                <div className="max-w-7xl mx-auto flex items-center px-6 py-4 gap-4">
                    <Link to="/" className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-100">
                        <AiOutlineArrowLeft size={24} />
                    </Link>
                    <h1 className="text-xl font-bold text-slate-100">Pengaturan</h1>
                </div>
            </header>

            <main className="flex-grow max-w-2xl mx-auto w-full p-6 space-y-8">
                <div className="glass p-8 rounded-3xl border border-slate-800 space-y-8">
                    <div>
                        <h2 className="text-emerald-500 font-bold text-lg mb-4">Ukuran Font Al-Quran</h2>
                        <div className="flex items-center gap-6">
                            <input
                                type="range"
                                min="24"
                                max="72"
                                value={fontSize}
                                onChange={(e) => setFontSize(parseInt(e.target.value))}
                                className="flex-grow h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
                            <span className="text-slate-100 font-bold text-xl w-12 text-center">{fontSize}px</span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-emerald-500 font-bold text-lg mb-4">Tampilan Konten</h2>
                        <div className="space-y-4">
                            <label className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-800 cursor-pointer hover:border-emerald-500/30 transition-all">
                                <span className="text-slate-100 font-medium">Tampilkan Terjemahan</span>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={showTranslation}
                                        onChange={(e) => setShowTranslation(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                </div>
                            </label>

                            <label className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-800 cursor-pointer hover:border-emerald-500/30 transition-all">
                                <span className="text-slate-100 font-medium">Tampilkan Tulisan Latin</span>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={showLatin}
                                        onChange={(e) => setShowLatin(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 pt-8">
                        <h3 className="text-slate-400 text-sm mb-4 uppercase tracking-widest font-bold">Preview</h3>
                        <div className="glass p-8 rounded-2xl border border-slate-700/50 bg-slate-900/50 min-h-[150px] flex flex-col gap-4">
                            <p
                                className="font-arab leading-[1.8] text-slate-100 text-right transition-all duration-200"
                                style={{ fontSize: `${fontSize}px` }}
                            >
                                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                            </p>
                            {showLatin && (
                                <p className="text-emerald-400/80 italic text-sm">Bismillaahir rahmaanir rahiim</p>
                            )}
                            {showTranslation && (
                                <p className="text-slate-300 text-sm">Dengan nama Allah yang Maha Pengasih lagi Maha Penyayang.</p>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                    >
                        <AiOutlineSave size={20} />
                        Simpan Pengaturan
                    </button>
                </div>

                <div className="p-6 bg-slate-900/40 rounded-2xl border border-slate-800">
                    <h3 className="text-emerald-500 font-bold mb-2">Info</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Ukuran font yang Anda pilih akan diterapkan pada teks Arab di setiap Surah. Pengaturan ini disimpan secara permanen di perangkat Anda.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default SettingsPage;
