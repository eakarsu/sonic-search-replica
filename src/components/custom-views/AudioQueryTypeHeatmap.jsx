// VIZ #2: Audio Query Type Heatmap (type x hour-of-day)
import { useEffect, useState } from 'react'

const API_BASE = (import.meta.env && import.meta.env.VITE_API_BASE) || 'http://localhost:3041'

function colorFor(v, max) {
  const t = Math.min(1, v / Math.max(1, max))
  const r = Math.round(255 - 100 * t)
  const g = Math.round(245 - 180 * t)
  const b = Math.round(235 - 80 * t)
  return `rgb(${r},${g},${b})`
}

export default function AudioQueryTypeHeatmap() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetch(API_BASE + '/api/custom-views/query-type-heatmap')
      .then(r => r.json())
      .then(d => { if (!cancelled) { setData(d); setLoading(false) } })
      .catch(e => { if (!cancelled) { setError(String(e)); setLoading(false) } })
    return () => { cancelled = true }
  }, [])

  if (loading) return <div style={{ padding: 16 }}>Loading heatmap...</div>
  if (error) return <div style={{ padding: 16, color: '#c33' }}>Error: {error}</div>
  if (!data?.cells?.length) return <div style={{ padding: 16 }}>No heatmap data</div>

  const max = Math.max(...data.cells.flatMap(c => c.hours))
  const cellW = 22, cellH = 24, labelW = 110

  return (
    <div data-testid="cv-query-heatmap" style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, overflowX: 'auto' }}>
      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Audio Query Type x Hour Heatmap</h3>
      <p style={{ margin: '4px 0 12px', color: '#6b7280', fontSize: 12 }}>
        Volume of voice queries per type per UTC hour. Darker = more queries.
      </p>
      <div style={{ display: 'inline-block' }}>
        <div style={{ display: 'flex', marginLeft: labelW, fontSize: 10, color: '#6b7280' }}>
          {data.hours.map(h => (
            <div key={h} style={{ width: cellW, textAlign: 'center' }}>{h}</div>
          ))}
        </div>
        {data.cells.map(row => (
          <div key={row.type} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: labelW, fontSize: 12, fontFamily: 'monospace' }}>{row.type}</div>
            {row.hours.map((v, i) => (
              <div
                key={i}
                title={row.type + ' @ ' + i + 'h = ' + v}
                style={{
                  width: cellW, height: cellH, background: colorFor(v, max), border: '1px solid #fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9,
                }}
              >
                {v}
              </div>
            ))}
            <div style={{ marginLeft: 8, fontSize: 11, color: '#6b7280' }}>Σ {row.total}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
