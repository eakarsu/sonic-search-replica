// NON-VIZ #1: Query History PDF generator/downloader
import { useState } from 'react'

const API_BASE = (import.meta.env && import.meta.env.VITE_API_BASE) || 'http://localhost:3041'

export default function QueryHistoryPdf() {
  const [limit, setLimit] = useState(20)
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)

  const download = async () => {
    setBusy(true); setStatus('Generating PDF...')
    try {
      const r = await fetch(API_BASE + '/api/custom-views/query-history-pdf?limit=' + encodeURIComponent(limit))
      if (!r.ok) throw new Error('HTTP ' + r.status)
      const blob = await r.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'voice-query-history.pdf'
      document.body.appendChild(a); a.click(); a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 1500)
      setStatus('Downloaded voice-query-history.pdf (' + blob.size + ' bytes)')
    } catch (e) {
      setStatus('Error: ' + e.message)
    } finally { setBusy(false) }
  }

  const preview = () => {
    const url = API_BASE + '/api/custom-views/query-history-pdf?limit=' + encodeURIComponent(limit)
    window.open(url, '_blank')
  }

  return (
    <div data-testid="cv-query-history-pdf" style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Voice Query History (PDF Export)</h3>
      <p style={{ margin: '4px 0 12px', color: '#6b7280', fontSize: 12 }}>
        Generate a printable PDF report of recent voice query history (transcript, latency, confidence).
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <label style={{ fontSize: 12, fontWeight: 600 }}>Rows:</label>
        <input
          type="number" min={5} max={50} value={limit}
          onChange={e => setLimit(parseInt(e.target.value, 10) || 20)}
          style={{ width: 80, padding: 6, border: '1px solid #ddd', borderRadius: 6, fontSize: 13 }}
        />
        <button
          onClick={download} disabled={busy}
          style={{ background: '#2563eb', color: '#fff', border: 0, padding: '6px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}
        >{busy ? 'Working...' : 'Download PDF'}</button>
        <button
          onClick={preview} disabled={busy}
          style={{ background: '#fff', color: '#2563eb', border: '1px solid #2563eb', padding: '6px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}
        >Preview in tab</button>
      </div>
      {status && <div style={{ fontSize: 12, color: '#374151' }}>{status}</div>}
    </div>
  )
}
