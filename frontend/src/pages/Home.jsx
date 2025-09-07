import React from 'react';
import { FileText, Shield, Eye, Download, ArrowRight, Scale, Users, Clock, Sparkles, CheckCircle } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <FileText className="w-7 h-7" />,
      title: 'Generate Wills',
      desc: 'Create a personalized Last Will and Testament using our guided form with built-in validation and legal compliance checks.',
      gradient: 'from-emerald-400 to-cyan-500'
    },
    {
      icon: <Scale className="w-7 h-7" />,
      title: 'Power of Attorney',
      desc: 'Draft comprehensive Power of Attorney documents by entering principal and attorney details with smart recommendations.',
      gradient: 'from-violet-400 to-purple-500'
    },
    {
      icon: <Eye className="w-7 h-7" />,
      title: 'Secure Preview',
      desc: 'View a watermarked, secure preview of your document before completing payment. No surprises, complete transparency.',
      gradient: 'from-orange-400 to-pink-500'
    },
    {
      icon: <Download className="w-7 h-7" />,
      title: 'Instant Download',
      desc: 'After secure payment processing, instantly download your finalized PDF document without watermarks or restrictions.',
      gradient: 'from-blue-400 to-indigo-500'
    }
  ];

  const stats = [
    { number: '15,000+', label: 'Documents Created', icon: <FileText className="w-5 h-5" /> },
    { number: '99.9%', label: 'Success Rate', icon: <CheckCircle className="w-5 h-5" /> },
    { number: '5 Min', label: 'Average Time', icon: <Clock className="w-5 h-5" /> },
    { number: '24/7', label: 'Support', icon: <Shield className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-cyan-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-teal-200/30 to-emerald-200/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-10 w-64 h-64 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>
   
      {/* Navigation */}
      <nav className="fixed w-full z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl px-6 py-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Scale className="w-7 h-7 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-800">LegalDocs</span>
                  <div className="text-xs text-emerald-600 font-medium">Professional • Secure • Fast</div>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <a href="#features" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Features</a>
                <a href="#pricing" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Pricing</a>
                <a href="#support" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Support</a>
                <div className="w-px h-6 bg-gray-300"></div>
                <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative px-6 pt-32">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-white/30 backdrop-blur-xl border border-white/40 rounded-full shadow-xl mb-8 group hover:bg-white/40 transition-all duration-300">
            <Sparkles className="w-5 h-5 mr-3 text-emerald-600" />
            <span className="text-gray-700 font-medium">Trusted by 15,000+ users worldwide</span>
            <div className="ml-3 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Legal Documents
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Generate professionally structured Wills and Power of Attorney documents in minutes. 
            Our intelligent platform ensures legal accuracy, compliance, and complete peace of mind.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <a 
              href="/will" 
              className="group flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-emerald-500/25"
            >
              <FileText className="w-6 h-6" />
              <span className="font-semibold">Create Your Will</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="/poa" 
              className="group flex items-center gap-3 bg-white/30 backdrop-blur-xl border border-white/40 text-gray-700 px-8 py-4 rounded-2xl hover:bg-white/40 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <Scale className="w-6 h-6" />
              <span className="font-semibold">Power of Attorney</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-xl hover:bg-white/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg text-white group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">{stat.number}</div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-white/30 backdrop-blur-xl border border-white/40 rounded-full shadow-xl mb-6">
              <span className="text-emerald-600 font-semibold">✨ Platform Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Everything you need in one place
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our comprehensive platform provides all the tools, guidance, and security features 
              you need to generate legally sound documents with complete confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-xl hover:bg-white/40 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-emerald-700 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl p-12 shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Users className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Ready to create your legal documents?
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Join thousands of satisfied customers who trust our platform for their legal document needs. 
              Start your journey to legal peace of mind today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="/will" 
                className="flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Clock className="w-6 h-6" />
                Start in Under 5 Minutes
              </a>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium">No signup required • Secure payment • Instant download</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl p-8 shadow-xl text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">LegalDocs</span>
            </div>
            <p className="text-gray-600 mb-4">
              Professional legal document generation platform trusted by thousands worldwide.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <span>© 2025 LegalDocs</span>
              <div className="w-px h-4 bg-gray-300"></div>
              <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
              <div className="w-px h-4 bg-gray-300"></div>
              <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
              <div className="w-px h-4 bg-gray-300"></div>
              <a href="#" className="hover:text-emerald-600 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}