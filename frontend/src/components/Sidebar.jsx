import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition border ${
      isActive
        ? 'bg-blue-50 border-blue-200 text-blue-700 font-semibold'
        : 'hover:bg-slate-50 border-transparent'
    }`

  return (
    <aside className="w-64 bg-white/80 backdrop-blur border-r h-screen sticky top-0 p-4">
      <div className="flex items-center gap-2 text-xl font-bold mb-6">
        <div className="h-8 w-8 rounded bg-blue-600 text-white grid place-items-center shadow">⚖️</div>
        <span>Legal Docs</span>
      </div>
      <nav className="space-y-2">
        <NavLink to="/" className={linkClasses} end>
          <span>🏠</span>
          <span>Home</span>
        </NavLink>
        <NavLink to="/will" className={linkClasses}>
          <span>🧾</span>
          <span>Will</span>
        </NavLink>
        <NavLink to="/poa" className={linkClasses}>
          <span>✍️</span>
          <span>Power of Attorney</span>
        </NavLink>
      </nav>
      <div className="mt-8 text-xs text-gray-500 border-t pt-4">
        Demo app for generating legal PDFs.
      </div>
    </aside>
  )
}
