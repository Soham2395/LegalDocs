import React from 'react'
import { ChevronRight, Menu, X, Scale, Sparkles, Bell, Search, Home } from 'lucide-react'

/**
 * GlassSidebar
 * Props:
 * - isOpen: boolean
 * - onToggle: () => void
 * - items: Array<{ icon: React.ReactNode, label: string, href: string, active?: boolean }>
 * - children: React.ReactNode (main content to render to the right)
 */
export default function GlassSidebar({ isOpen, onToggle, items = [], children }) {
  return (
    <div className="relative flex w-full">
      {/* Toggle (mobile) */}
      <button
        onClick={onToggle}
        className="fixed top-6 left-6 z-50 p-3 bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl shadow-xl hover:bg-white/30 transition-all duration-300 group lg:hidden"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-gray-700 group-hover:text-emerald-600 transition-colors" />
        ) : (
          <Menu className="w-5 h-5 text-gray-700 group-hover:text-emerald-600 transition-colors" />
        )}
      </button>

      {/* Overlay (mobile) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={onToggle} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-80 bg-white/30 backdrop-blur-xl border-r border-white/40 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col overflow-hidden">
          {/* Header */}
          <div className="pt-8 px-5 pb-5 border-b border-white/30">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <Scale className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-800">LegalDocs</span>
                <div className="text-xs text-emerald-600 font-medium">Professional Suite</div>
              </div>
            </div>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full bg-white/50 backdrop-blur border border-white/60 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Nav */}
          <nav className="px-4 py-4 flex-1 overflow-y-auto">
            <div className="space-y-2">
              {items.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className={`group flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-300 hover:bg-white/50 ${
                    item.active ? 'bg-gradient-to-r from-emerald-500/15 to-teal-500/15 ring-1 ring-emerald-200 text-emerald-700' : 'text-gray-700 hover:text-emerald-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`rounded-md transition-all duration-300 ${item.active ? 'p-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md' : 'p-1.5 bg-white/60 text-gray-600 group-hover:bg-emerald-100 group-hover:text-emerald-600'}`}>
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </nav>

          {/* Back to Home */}
          <div className="px-4 pb-3">
            <a
              href="/"
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-lg px-4 py-2.5 shadow transition-all duration-300"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-semibold">Back to Home</span>
            </a>
          </div>

          {/* Footer */}
          <div className="mt-auto p-4 border-t border-white/30">
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-200/50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Pro Features</h4>
                  <p className="text-xs text-gray-600">Unlock premium templates</p>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-medium py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Upgrade Now
              </button>
            </div>

            <div className="mt-4 flex items-center gap-3 p-3 bg-white/20 rounded-xl border border-white/30">
              <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                JD
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800 text-sm">John Doe</div>
                <div className="text-xs text-gray-600">Premium Member</div>
              </div>
              <Bell className="w-4 h-4 text-gray-500 hover:text-emerald-600 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </aside>

      {/* Content offset */}
      <div className="flex-1 w-full transition-all duration-300 lg:pl-80">
        {children}
      </div>
    </div>
  )
}
