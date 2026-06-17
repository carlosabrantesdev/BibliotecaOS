'use client';

import { useAuth } from '../context/AuthContext';

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { role } = useAuth();

  return (
    <header className="w-full h-16 bg-white border-b border-[#c6c6cd] flex justify-between items-center px-8 sticky top-0 z-10">
      <div className="flex items-center">
        <button 
          onClick={onMenuClick}
          className="text-[#45464d] hover:text-black transition-colors hover:bg-[#f2f4f6] p-2 rounded-full cursor-pointer"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

    </header>
  );
}
