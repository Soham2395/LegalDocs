import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { 
  Scale, User, MapPin, Calendar, FileText, Mail, CheckCircle, 
  Sparkles, Shield
} from 'lucide-react'
import Preview from '../components/Preview.jsx'
import api from '../api/axios'
import GlassSidebar from '../components/GlassSidebar.jsx'
import PageHeader from '../components/PageHeader.jsx'

// removed inline GlassSidebar; using shared component

// Will document fields: match backend placeholders
const fields = [
  { name: 'full_name', label: 'Full Name', icon: <User className="w-5 h-5" />, placeholder: 'Your full legal name' },
  { name: 'address', label: 'Address', icon: <MapPin className="w-5 h-5" />, placeholder: 'Your full address' },
  { name: 'dob', label: 'Date of Birth', icon: <Calendar className="w-5 h-5" />, type: 'date' },
  { name: 'execution_date', label: 'Execution Date', icon: <Calendar className="w-5 h-5" />, type: 'date' },
  { name: 'beneficiaries', label: 'Beneficiaries (comma separated)', icon: <FileText className="w-5 h-5" />, type: 'textarea', placeholder: 'e.g. Alice Smith, Bob Jones' },
  { name: 'executor', label: 'Executor', icon: <User className="w-5 h-5" />, placeholder: 'Executor full name' },
  { name: 'provisions', label: 'Further Provisions', icon: <FileText className="w-5 h-5" />, type: 'textarea', placeholder: 'Any additional provisions or wishes' },
  { name: 'witness1', label: 'Witness 1', icon: <User className="w-5 h-5" />, placeholder: 'Witness 1 full name' },
  { name: 'witness2', label: 'Witness 2', icon: <User className="w-5 h-5" />, placeholder: 'Witness 2 full name' },
  { name: 'city', label: 'City of Execution', icon: <MapPin className="w-5 h-5" />, placeholder: 'City where the Will is executed' },
]

export default function WillForm() {
  const location = useLocation()
  const sidebarItems = [
    { icon: <FileText className="w-5 h-5" />, label: 'Will Form', href: '/will', active: location.pathname.startsWith('/will') },
    { icon: <Scale className="w-5 h-5" />, label: 'POA Form', href: '/poa', active: location.pathname.startsWith('/poa') },
  ]
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewB64, setPreviewB64] = useState(null)
  const [finalReady, setFinalReady] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    fields.forEach(field => {
      const val = formData[field.name]
      if (val === undefined || val === null || String(val).trim() === '') {
        newErrors[field.name] = 'This field is required'
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return
    setIsSubmitting(true)
    setFinalReady(false)
    try {
      const payload = { doc_type: 'WILL', data: formData }
      const res = await api.post('/generate-pdf', payload)
      setPreviewB64(res.data?.pdf_base64 || null)
    } catch (e) {
      console.error('Preview generation failed', e)
      setPreviewB64(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePay = async () => {
    try {
      const payload = { doc_type: 'WILL', data: formData }
      const res = await api.post('/final-pdf', payload, { responseType: 'blob' })
      const url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
      const a = document.createElement('a')
      a.href = url
      a.download = 'will-document.pdf'
      a.click()
      URL.revokeObjectURL(url)
      setFinalReady(true)
      try { localStorage.removeItem('will_form_draft') } catch {}
    } catch (e) {
      console.error('Final PDF download failed', e)
    } finally {
      setPreviewB64(null)
    }
  }

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('will_form_draft')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed && typeof parsed === 'object') {
          setFormData(parsed)
        }
      }
    } catch {}
  }, [])

  // Persist draft to localStorage when formData changes (debounced)
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        localStorage.setItem('will_form_draft', JSON.stringify(formData || {}))
      } catch {}
    }, 300)
    return () => clearTimeout(id)
  }, [formData])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 relative overflow-hidden flex">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <GlassSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} items={sidebarItems}>
        {/* Main Content */}
        <div className="relative flex-1">
          <PageHeader title="LegalDocs" subtitle="Will" />

          {/* Main Content */}
          <div className="relative px-6 py-12">
            <div className="max-w-5xl mx-auto">
              {/* Header Section */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-6 py-3 bg-white/30 backdrop-blur-xl border border-white/40 rounded-full shadow-xl mb-6">
                  <Scale className="w-5 h-5 mr-3 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">Will Generator</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Create Your Will</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Provide your details, beneficiaries, and executor to generate a professional Last Will & Testament. 
                  You will preview a watermarked PDF before final download.
                </p>
              </div>

              {/* Form Section */}
              <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
                <div className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {fields.map(f => {
                      let inputType = f.type || 'text'
                      if (f.name === 'dob' || f.name === 'execution_date') inputType = 'date'

                      const isTextarea = f.type === 'textarea'
                      const isFullWidth = isTextarea

                      return (
                        <div 
                          key={f.name} 
                          className={`group ${isFullWidth ? 'lg:col-span-2' : 'col-span-1'}`}
                        >
                          <label className="flex items-center gap-3 text-gray-700 font-semibold mb-3 group-hover:text-emerald-700 transition-colors">
                            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg text-white shadow-md group-hover:scale-110 transition-transform">
                              {f.icon}
                            </div>
                            {f.label}
                          </label>
                          
                          <div className="relative">
                            {isTextarea ? (
                              <textarea
                                rows={4}
                                placeholder={f.placeholder}
                                value={formData[f.name] || ''}
                                onChange={(e) => handleInputChange(f.name, e.target.value)}
                                className={`w-full bg-white/50 backdrop-blur border border-white/60 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 resize-none ${
                                  errors[f.name] 
                                    ? 'border-red-400 bg-red-50/50' 
                                    : 'hover:bg-white/60'
                                }`}
                              />
                            ) : (
                              <input
                                type={inputType}
                                placeholder={f.placeholder}
                                value={formData[f.name] || ''}
                                onChange={(e) => handleInputChange(f.name, e.target.value)}
                                className={`w-full bg-white/50 backdrop-blur border border-white/60 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 ${
                                  errors[f.name] 
                                    ? 'border-red-400 bg-red-50/50' 
                                    : 'hover:bg-white/60'
                                }`}
                              />
                            )}
                            
                            {errors[f.name] && (
                              <div className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-600">
                                <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                                <p className="text-sm font-medium">{errors[f.name]}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Submit Section */}
                  <div className="border-t border-white/30 pt-8 mt-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Shield className="w-5 h-5 text-emerald-500" />
                          <span className="text-sm font-medium">Secure • Encrypted • Professional</span>
                        </div>
                        {finalReady && (
                          <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg border border-emerald-200">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">Payment completed! Document downloaded.</span>
                          </div>
                        )}
                      </div>
                      
                      <button 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="group flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Generating Preview...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            Generate Preview
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassSidebar>

      {/* Real Preview Modal */}
      {previewB64 && (
        <Preview base64={previewB64} onClose={() => setPreviewB64(null)} onPay={handlePay} />
      )}
    </div>
  )
}