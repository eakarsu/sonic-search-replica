// VIZ #1: Query Latency Timeline
// Renders an SVG line chart over the /api/custom-views/query-latency response.
import { useEffect, useState } from 'react'

const API_BASE = (import.meta.env && import.meta.env.VITE_API_BASE) || 'http://localhost:3041'

export default function QueryLatencyTimeline() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch(API_BASE + '/api/custom-views/query-latency?days=14')
      .then(r => r.json())
      .then(d => { if (!cancelled) { setData(d); setLoading(false) } })
      .catch(e => { if (!cancelled) { setError(String(e)); setLoading(false) } })
    return () => { cancelled = true }
  }, [])

  if (loading) return <div style={{ padding: 16 }}>Loading latency timeline...</div>
  if (error) return <div style={{ padding: 16, color: '#c33' }}>Error: {error}</div>
  if (!data?.series?.length) return <div style={{ padding: 16 }}>No latency data</div>

  const W = 720, H = 240, P = 32
  const ys = data.series.flatMap(s => [s.p50, s.p95, s.p99])
  const yMax = Math.max(...ys) * 1.1
  const xStep = (W - 2 * P) / Math.max(1, data.series.length - 1)
  const yScale = v => H - P - (v / yMax) * (H - 2 * P)
  const path = key => data.series.map((s, i) => (i === 0 ? 'M' : 'L') + (P + i * xStep) + ',' + yScale(s[key])).join(' ')

  return (
    <div data-testid="cv-query-latency" style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Voice Query Latency Timeline</h3>
      <p style={{ margin: '4px 0 12px', color: '#6b7280', fontSize: 12 }}>
        avg p50 {data.summary.avgP50}ms / p95 {data.summary.avgP95}ms / p99 {data.summary.avgP99}ms over {data.days} days
      </p>
      <svg width={W} height={H} role="img" aria-label="Query latency timeline">
        <rect x={0} y={0} width={W} height={H} fill="#fafafa" />
        {[0.25, 0.5, 0.75, 1].map((f, i) => (
          <line key={i} x1={P} y1={yScale(yMax * f)} x2={W - P} y2={yScale(yMax * f)} stroke="#eef" strokeWidth={1} />
        ))}
        <path d={path('p50')} fill="none" stroke="#2563eb" strokeWidth={2} />
        <path d={path('p95')} fill="none" stroke="#f59e0b" strokeWidth={2} />
        <path d={path('p99')} fill="none" stroke="#dc2626" strokeWidth={2} />
        {data.series.map((s, i) => (
          <g key={i}>
            <circle cx={P + i * xStep} cy={yScale(s.p50)} r={2.5} fill="#2563eb" />
            <circle cx={P + i * xStep} cy={yScale(s.p95)} r={2.5} fill="#f59e0b" />
            <circle cx={P + i * xStep} cy={yScale(s.p99)} r={2.5} fill="#dc2626" />
          </g>
        ))}
      </svg>
      <div style={{ display: 'flex', gap: 16, fontSize: 12, marginTop: 8 }}>
        <span><span style={{ display: 'inline-block', width: 10, height: 10, background: '#2563eb', marginRight: 4 }} />p50</span>
        <span><span style={{ display: 'inline-block', width: 10, height: 10, background: '#f59e0b', marginRight: 4 }} />p95</span>
        <span><span style={{ display: 'inline-block', width: 10, height: 10, background: '#dc2626', marginRight: 4 }} />p99</span>
      </div>
    </div>
  )
}
