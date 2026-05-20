'use client';

export default function Topbar() {
  return (
    <header className="w-full h-16 bg-white border-b border-[#c6c6cd] flex justify-between items-center px-8 sticky top-0 z-10">
      <div className="flex items-center"></div>
      <div className="flex items-center space-x-6">
        <button className="text-[#45464d] hover:text-black transition-colors hover:bg-[#f2f4f6] p-2 rounded-full cursor-pointer">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="text-[#45464d] hover:text-black transition-colors hover:bg-[#f2f4f6] p-2 rounded-full cursor-pointer">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="w-8 h-8 rounded-full bg-[#e0e3e5] overflow-hidden border border-[#c6c6cd]">
          <img alt="Perfil do Administrador" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuP8eU-Tn9wuMk6Ki3fkJxZCMezwJ7-FoYhvX7o5REhZOMYw11jXAgkHJrHfy1_HLWyhl9LCIU0MHgXl4HxLNId-DzN_M7yAoGPpTkBG2C52RpBTPfqg8IRbEEHFc6QLGlMvPwYXnxaA1N9ES6eZMYpNnDv_2vyGluQoopxkhVlzQ-R454eEhFPqQUBGYaAPOvs0xiJxQw8flxKvrE2NlCNBw3FSzA8TTA-po_k3pAqgspkU1HVX6hro4nBr8tGTSmh-NSEzK_i4I" />
        </div>
      </div>
    </header>
  );
}
