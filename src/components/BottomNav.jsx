import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome, AiOutlinePlusCircle, AiOutlineClockCircle, AiOutlineSetting } from 'react-icons/ai';

function BottomNav() {
    const navItems = [
        { to: '/', icon: <AiOutlineHome size={24} />, label: 'Beranda' },
        { to: '/tasbih', icon: <AiOutlinePlusCircle size={24} />, label: 'Tasbih' },
        { to: '/jadwal-sholat', icon: <AiOutlineClockCircle size={24} />, label: 'Jadwal' },
        { to: '/settings', icon: <AiOutlineSetting size={24} />, label: 'Setelan' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass border-t border-slate-800 pb-safe-area-inset-bottom">
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center w-full h-full gap-1 transition-all relative ${isActive ? 'text-emerald-500' : 'text-slate-400'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <div className={`relative transition-transform duration-300 ${isActive ? 'scale-110 -translate-y-1' : ''}`}>
                                    {item.icon}
                                    {isActive && (
                                        <div className="absolute inset-0 bg-emerald-500/20 blur-lg rounded-full"></div>
                                    )}
                                </div>
                                <span className={`text-[10px] font-medium transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                                    {item.label}
                                </span>
                                {isActive && (
                                    <div className="absolute bottom-1 w-1 h-1 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}

export default BottomNav;
