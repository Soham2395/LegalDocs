import { useEffect, useMemo, useRef, useState } from 'react'
// PDF.js for consistent inline rendering
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'
// Use the packaged worker that matches the installed version (Vite url import)
// pdfjs-dist v5 publishes an ESM worker as .mjs
// eslint-disable-next-line import/no-unresolved
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
GlobalWorkerOptions.workerSrc = pdfjsWorker

export default function Preview({ base64, onClose, onPay }) {
  // Convert base64 to a Blob URL for better browser reliability than data URLs
  const objectUrlRef = useRef(null)
  const [renderError, setRenderError] = useState(null)
  const [isRendering, setIsRendering] = useState(false)
  const canvasContainerRef = useRef(null)
  const loadingTaskRef = useRef(null)
  const renderIdRef = useRef(0)

  const memo = useMemo(() => {
    if (!base64) return { viewUrl: null, newTabUrl: null, byteArray: null }
    try {
      // Normalize: strip data: prefix and whitespace/newlines
      let b64 = base64
      if (b64.startsWith('data:')) {
        const commaIdx = b64.indexOf(',')
        b64 = commaIdx >= 0 ? b64.slice(commaIdx + 1) : b64
      }
      b64 = b64.replace(/\s/g, '')
      const byteChars = atob(b64)
      const byteNumbers = new Array(byteChars.length)
      for (let i = 0; i < byteChars.length; i++) {
        byteNumbers[i] = byteChars.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], { type: 'application/pdf' })
      const u = URL.createObjectURL(blob)
      objectUrlRef.current = u
      const dataUrl = base64.startsWith('data:') ? base64 : `data:application/pdf;base64,${b64}`
      return { viewUrl: u, newTabUrl: dataUrl, byteArray }
    } catch (e) {
      console.error('Failed to build PDF blob URL', e)
      // Fallback to data URL if Blob creation fails
      const dataUrl = base64 && base64.startsWith('data:') ? base64 : `data:application/pdf;base64,${base64 || ''}`
      return { viewUrl: dataUrl, newTabUrl: dataUrl, byteArray: null }
    }
  }, [base64])
  const { viewUrl, newTabUrl, byteArray } = memo

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current)
        objectUrlRef.current = null
      }
    }
  }, [])

  // Render with PDF.js for consistent inline preview
  useEffect(() => {
    async function renderPdf() {
      if (!byteArray || !canvasContainerRef.current) return
      setIsRendering(true)
      setRenderError(null)
      // Bump render ID and capture for this run
      renderIdRef.current += 1
      const myRenderId = renderIdRef.current
      // Cancel any existing task and clear canvases
      try {
        if (loadingTaskRef.current) {
          await loadingTaskRef.current.destroy().catch(() => {})
          loadingTaskRef.current = null
        }
      } catch {}
      canvasContainerRef.current.innerHTML = ''
      try {
        // Clone the data so the worker can transfer ownership without detaching our original buffer
        const clonedBuffer = byteArray.buffer ? byteArray.buffer.slice(0) : null
        const dataCopy = clonedBuffer ? new Uint8Array(clonedBuffer) : (byteArray.slice ? byteArray.slice(0) : new Uint8Array(byteArray))
        const loadingTask = getDocument({ data: dataCopy })
        loadingTaskRef.current = loadingTask
        const pdf = await loadingTask.promise
        // Compute scale to fit container width
        const container = canvasContainerRef.current
        // Wait one frame to ensure layout is measured correctly (avoids 0 width in some sizes)
        await new Promise((res) => requestAnimationFrame(() => res()))
        const containerWidth = container.clientWidth || container.offsetWidth || 800
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          // If a newer render started, stop appending
          if (myRenderId !== renderIdRef.current) break
          const page = await pdf.getPage(pageNum)
          const initialViewport = page.getViewport({ scale: 1 })
          const scale = containerWidth / initialViewport.width
          const viewport = page.getViewport({ scale })
          const canvas = document.createElement('canvas')
          canvas.width = viewport.width
          canvas.height = viewport.height
          canvas.style.width = '100%'
          canvas.style.height = 'auto'
          const ctx = canvas.getContext('2d')
          await page.render({ canvasContext: ctx, viewport }).promise
          if (myRenderId !== renderIdRef.current) break
          canvasContainerRef.current.appendChild(canvas)
          const spacer = document.createElement('div')
          spacer.style.height = '16px'
          canvasContainerRef.current.appendChild(spacer)
        }
      } catch (err) {
        // Ignore benign errors when the worker is intentionally destroyed during unmount/resize
        const msg = err && err.message ? err.message : String(err)
        if (!/Worker was destroyed|terminat/i.test(msg)) {
          console.error('PDF.js render failed', err)
          setRenderError(`Could not render preview inline. ${msg}`)
        }
      } finally {
        setIsRendering(false)
      }
    }
    let cancelled = false
    ;(async () => {
      try {
        if (!cancelled) await renderPdf()
      } catch (e) {
      }
    })()
    return () => {
      cancelled = true
      // Ensure we stop any in-flight rendering and clear canvases
      renderIdRef.current += 1
      if (loadingTaskRef.current) {
        loadingTaskRef.current.destroy().catch(() => {})
        loadingTaskRef.current = null
      }
      if (canvasContainerRef.current) {
        canvasContainerRef.current.innerHTML = ''
      }
    }
  }, [byteArray])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onContextMenu={(e) => e.preventDefault()}>
      <div className="bg-white rounded shadow-xl w-11/12 h-5/6 flex flex-col">
        <div className="p-3 border-b flex items-center justify-between">
          <div className="font-semibold">Preview – Not Downloadable</div>
          <div className="space-x-2">
            <button onClick={onPay} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-3 py-1 rounded-sm shadow">Make Payment</button>
            <button onClick={onClose} className="px-3 py-1 rounded border">Close</button>
          </div>
        </div>
        <div className="flex-1 relative overflow-auto" onContextMenu={(e) => e.preventDefault()}>
          <div className="absolute inset-0 p-4 overflow-auto" ref={canvasContainerRef} />
          {isRendering && (
            <div className="absolute inset-0 grid place-items-center text-gray-500 bg-white/50">Rendering preview…</div>
          )}
          {renderError && (
            <div className="absolute inset-0 p-4 overflow-auto">
              {/* Fallback viewer via object/embed using data URL */}
              <object data={`${newTabUrl}#toolbar=0&navpanes=0&scrollbar=0`} type="application/pdf" className="w-full h-full">
                <embed src={`${newTabUrl}#toolbar=0&navpanes=0&scrollbar=0`} type="application/pdf" className="w-full h-full" />
                <div className="w-full h-full grid place-items-center p-6 text-center text-gray-600">
                  <p>Unable to display PDF preview inline. This can happen due to browser settings.</p>
                  <p className="mt-2">
                    <a href={newTabUrl} target="_blank" rel="noopener" className="text-blue-700 underline">Open the watermarked preview in a new tab</a>
                  </p>
                </div>
              </object>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
