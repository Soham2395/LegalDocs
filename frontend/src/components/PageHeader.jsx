import React from 'react'
import { Scale } from 'lucide-react'

/**
 * PageHeader
 * Props:
 * - title: string
 * - subtitle?: string
 */
export default function PageHeader({ title, subtitle }) {
  return (
    <header className="relative z-10 px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl px-6 py-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <Scale className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-800">{title}</span>
                {subtitle && <div className="text-xs text-emerald-600 font-medium">{subtitle}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
