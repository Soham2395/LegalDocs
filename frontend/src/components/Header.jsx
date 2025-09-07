export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-white to-slate-50 border-b p-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <h1 className="text-lg font-semibold tracking-tight">Legal Document Generator</h1>
      <div className="text-sm text-gray-600">
        Demo · Preview is watermarked · Final after dummy payment
      </div>
    </header>
  )
}
