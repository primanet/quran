import React from 'react'
import { AiFillHeart } from 'react-icons/ai';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='w-full mt-20 border-t border-slate-800 glass py-12'>
            <div className='max-w-7xl mx-auto px-6 flex flex-col items-center gap-6'>
                <div className='flex items-center gap-2 group'>
                    <div className='w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20'>
                        <span className='text-white font-bold text-sm'>Q</span>
                    </div>
                    <h2 className='text-xl font-bold text-slate-200'>Al Qur'an Indonesia</h2>
                </div>

                <p className='text-slate-400 text-center max-w-md'>
                    Aplikasi membaca Al-Qur'an digital sederhana dengan desain modern untuk kenyamanan ibadah Anda.
                </p>

                <div className='flex flex-col items-center gap-2 pt-6 border-t border-slate-800 w-full'>
                    <p className='text-slate-400 flex items-center gap-2'>
                        Design with <AiFillHeart className='text-rose-500' /> by <span className='text-emerald-500 font-semibold'>iwan supriadi</span>
                    </p>
                    <span className='text-slate-500 text-sm'>© {currentYear} Al-Quran Digital. All rights reserved.</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
