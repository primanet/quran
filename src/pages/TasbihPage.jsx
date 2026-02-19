import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineReload } from 'react-icons/ai';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import Footer from '../components/Footer';

function TasbihPage() {
    const [count, setCount] = useState(0);
    const [target, setTarget] = useState(33);

    useEffect(() => {
        const savedCount = localStorage.getItem('tasbih_count');
        if (savedCount) setCount(parseInt(savedCount));
    }, []);

    useEffect(() => {
        localStorage.setItem('tasbih_count', count.toString());
    }, [count]);

    const increment = () => {
        setCount(prev => prev + 1);
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    };

    const resetCount = () => {
        Swal.fire({
            title: 'Reset Hitungan?',
            text: "Anda akan mengulang hitungan dari nol.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Ya, Reset!',
            cancelButtonText: 'Batal',
            background: '#0f172a',
            color: '#f8fafc'
        }).then((result) => {
            if (result.isConfirmed) {
                setCount(0);
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: '#1e293b',
                    color: '#f8fafc',
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                });

                Toast.fire({
                    icon: 'success',
                    title: 'Hitungan berhasil di-reset'
                });
            }
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-950">
            <header className="sticky top-0 z-50 glass shadow-lg">
                <div className="max-w-7xl mx-auto flex items-center px-6 py-4 gap-4">
                    <Link to="/" className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-100">
                        <AiOutlineArrowLeft size={24} />
                    </Link>
                    <h1 className="text-xl font-bold text-slate-100">Tasbih Digital</h1>
                </div>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center p-6 gap-8">
                <div className="relative w-80 h-80">
                    {/* Outer circle decoration */}
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-pulse"></div>
                    <div className="absolute inset-4 rounded-full border-2 border-emerald-500/30"></div>

                    {/* Main Button Area */}
                    <button
                        onClick={increment}
                        className="absolute inset-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-2xl shadow-emerald-500/40 flex flex-col items-center justify-center active:scale-95 transition-transform group"
                    >
                        <span className="text-6xl font-black text-white drop-shadow-md select-none">{count}</span>
                        <span className="text-emerald-100/70 font-medium mt-2 uppercase tracking-widest text-xs select-none">Klik untuk Tasbih</span>
                    </button>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-slate-400 text-sm">Target</p>
                        <select
                            value={target}
                            onChange={(e) => setTarget(parseInt(e.target.value))}
                            className="bg-slate-900 border border-slate-700 text-slate-100 px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/50"
                        >
                            <option value={33}>33</option>
                            <option value={99}>99</option>
                            <option value={100}>100</option>
                            <option value={1000}>1000</option>
                        </select>
                    </div>

                    <button
                        onClick={resetCount}
                        className="p-4 bg-slate-900 border border-slate-700 hover:border-red-500/50 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-2xl transition-all"
                        title="Reset"
                    >
                        <AiOutlineReload size={24} />
                    </button>
                </div>

                <div className="max-w-md w-full glass p-6 rounded-2xl border border-slate-800">
                    <h3 className="text-emerald-500 font-bold mb-2">Tips</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Gunakan tasbih digital ini untuk berdzikir di mana saja. Hitungan akan tersimpan otomatis walaupun halaman ditutup.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default TasbihPage;
