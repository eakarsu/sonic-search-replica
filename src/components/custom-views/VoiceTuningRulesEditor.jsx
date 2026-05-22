// NON-VIZ #2: Voice Tuning Rules Editor (full CRUD)
import { useEffect, useState } from 'react'

const API_BASE = (import.meta.env && import.meta.env.VITE_API_BASE) || 'http://localhost:3041'
const KINDS = ['wake-word', 'denoise', 'rewrite', 'intent', 'asr-bias']

export default function VoiceTuningRulesEditor() {
  const [rules, setRules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', kind: 'wake-word', priority: 5, expression: '', action: '', enabled: true })
  const [editId, setEditId] = useState(null)
  const [status, setStatus] = useState('')

  const load = async () => {
    setLoading(true); setError('')
    try {
      const r = await fetch(API_BASE + '/api/custom-views/voice-tuning-rules')
      const d = await r.json()
      setRules(d.rules || [])
    } catch (e) { setError(String(e)) } finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const reset = () => { setEditId(null); setForm({ name: '', kind: 'wake-word', priority: 5, expression: '', action: '', enabled: true }) }
  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const submit = async (e) => {
    e.preventDefault(); setStatus('')
    try {
      const method = editId ? 'PUT' : 'POST'
      const url = API_BASE + '/api/custom-views/voice-tuning-rules' + (editId ? '/' + editId : '')
      const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error || 'failed')
      setStatus(editId ? 'Updated rule ' + editId : 'Created rule ' + d.rule.id)
      reset(); await load()
    } catch (e) { setStatus('Error: ' + e.message) }
  }

  const edit = (rule) => {
    setEditId(rule.id)
    setForm({ name: rule.name, kind: rule.kind, priority: rule.priority, expression: rule.expression || '', action: rule.action || '', enabled: rule.enabled })
  }
  const del = async (id) => {
    if (!confirm('Delete rule ' + id + '?')) return
    try {
      const r = await fetch(API_BASE + '/api/custom-views/voice-tuning-rules/' + id, { method: 'DELETE' })
      if (!r.ok) { const d = await r.json(); throw new Error(d.error || 'failed') }
      setStatus('Deleted ' + id); await load()
    } catch (e) { setStatus('Error: ' + e.message) }
  }

  return (
    <div data-testid="cv-voice-tuning-rules" style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Voice Tuning Rules Editor</h3>
      <p style={{ margin: '4px 0 12px', color: '#6b7280', fontSize: 12 }}>
        Define rules that bias wake-word detection, denoise behavior, and ASR rewrites.
      </p>

      <form onSubmit={submit} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, marginBottom: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 8, marginBottom: 8 }}>
          <input required placeholder="Rule name" value={form.name} onChange={e => upd('name', e.target.value)} style={inputStyle} />
          <select value={form.kind} onChange={e => upd('kind', e.target.value)} style={inputStyle}>
            {KINDS.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
          <input type="number" min={0} max={100} placeholder="Priority" value={form.priority} onChange={e => upd('priority', parseInt(e.target.value, 10) || 0)} style={inputStyle} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
          <input placeholder='Expression (e.g. phrase == "hey hound")' value={form.expression} onChange={e => upd('expression', e.target.value)} style={inputStyle} />
          <input placeholder='Action (e.g. boost(1.4))' value={form.action} onChange={e => upd('action', e.target.value)} style={inputStyle} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <label style={{ fontSize: 12 }}>
            <input type="checkbox" checked={form.enabled} onChange={e => upd('enabled', e.target.checked)} style={{ marginRight: 4 }} />
            enabled
          </label>
          <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 0, padding: '6px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}>
            {editId ? 'Update' : 'Create'}
          </button>
          {editId && <button type="button" onClick={reset} style={{ background: '#fff', border: '1px solid #ddd', padding: '6px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}>Cancel</button>}
        </div>
      </form>
      {status && <div style={{ fontSize: 12, color: '#374151', marginBottom: 8 }}>{status}</div>}
      {error && <div style={{ fontSize: 12, color: '#c33' }}>{error}</div>}

      {loading ? <div style={{ fontSize: 13 }}>Loading...</div> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ background: '#f3f4f6', textAlign: 'left' }}>
              <th style={th}>id</th><th style={th}>name</th><th style={th}>kind</th><th style={th}>pri</th>
              <th style={th}>expression</th><th style={th}>action</th><th style={th}>en</th><th style={th}>ops</th>
            </tr>
          </thead>
          <tbody>
            {rules.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={td}>{r.id}</td><td style={td}>{r.name}</td><td style={td}>{r.kind}</td><td style={td}>{r.priority}</td>
                <td style={td}><code>{r.expression}</code></td><td style={td}><code>{r.action}</code></td>
                <td style={td}>{r.enabled ? 'Y' : 'N'}</td>
                <td style={td}>
                  <button onClick={() => edit(r)} style={btnSm}>Edit</button>{' '}
                  <button onClick={() => del(r.id)} style={{ ...btnSm, color: '#c33', borderColor: '#fbb' }}>Del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

const inputStyle = { padding: 6, border: '1px solid #ddd', borderRadius: 6, fontSize: 13, width: '100%', boxSizing: 'border-box' }
const th = { padding: '6px 8px', fontWeight: 600, fontSize: 11, color: '#374151', borderBottom: '1px solid #e5e7eb' }
const td = { padding: '6px 8px', verticalAlign: 'top' }
const btnSm = { background: '#fff', border: '1px solid #ddd', padding: '2px 8px', borderRadius: 4, fontSize: 11, cursor: 'pointer' }
