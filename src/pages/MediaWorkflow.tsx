import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';

type User = { id: number; name: string; email: string; role: 'CREATOR' | 'REVIEWER' | 'ADMIN' };
type Project = { id: string; title: string; language: string; latest_version_id?: string; version_number?: number; processing_state?: string; review_state?: string };
type Version = {
  id: string; version_number: number; processing_state: string; review_state: string; transcript: string;
  transcript_provenance: string; source_filename: string; content_sha256: string; size_bytes: number;
  duration_ms?: number; sample_rate_hz?: number; channel_count?: number; bit_depth?: number;
  job_id: string; job_status: string; attempts: number; max_attempts: number; error_code?: string; error_message?: string;
};

const storageKey = 'sonic_media_token';

async function responseJson(response: Response) {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || `Request failed (${response.status})`);
  return body;
}

function AuthScreen({ onAuthenticated }: { onAuthenticated: (token: string, user: User) => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage('');
    try {
      const payload = mode === 'register' ? { name, email, password } : { email, password };
      const result = await responseJson(await fetch(`/api/auth/${mode}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
      onAuthenticated(result.token, result.user);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Authentication failed'); }
    finally { setBusy(false); }
  }
  return <main className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100">
    <section className="mx-auto max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl" aria-labelledby="auth-title">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Sonic media workflow</p>
      <h1 id="auth-title" className="text-3xl font-bold">{mode === 'login' ? 'Sign in' : 'Create a creator account'}</h1>
      <p className="mt-3 text-sm text-slate-300">Package canonical WAV audio with a human-supplied transcript, captions, approval, and an immutable audit trail.</p>
      <form className="mt-8 space-y-5" onSubmit={submit}>
        {mode === 'register' && <label className="block text-sm font-medium">Name<input className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2" value={name} onChange={(event) => setName(event.target.value)} minLength={2} maxLength={120} autoComplete="name" required /></label>}
        <label className="block text-sm font-medium">Email<input className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></label>
        <label className="block text-sm font-medium">Password<input className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2" type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={mode === 'register' ? 12 : 1} maxLength={72} autoComplete={mode === 'register' ? 'new-password' : 'current-password'} required /></label>
        {mode === 'register' && <p className="text-xs text-slate-400">Use 12–72 characters with upper-case, lower-case, and numeric characters.</p>}
        <p className="min-h-6 text-sm text-rose-300" role="alert">{message}</p>
        <button className="w-full rounded-lg bg-cyan-400 px-4 py-2 font-bold text-slate-950 hover:bg-cyan-300 disabled:opacity-60" disabled={busy}>{busy ? 'Working…' : mode === 'login' ? 'Sign in' : 'Register'}</button>
      </form>
      <button className="mt-5 w-full text-sm text-cyan-300 underline" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setMessage(''); }}>{mode === 'login' ? 'Need a creator account?' : 'Already have an account?'}</button>
    </section>
  </main>;
}

function Preview({ token, version }: { token: string; version: Version }) {
  const [audioUrl, setAudioUrl] = useState(''); const [captionsUrl, setCaptionsUrl] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  useEffect(() => () => { if (audioUrl) URL.revokeObjectURL(audioUrl); if (captionsUrl) URL.revokeObjectURL(captionsUrl); }, [audioUrl, captionsUrl]);
  async function load() {
    setLoading(true); setError('');
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [audio, captions] = await Promise.all([fetch(`/api/media/versions/${version.id}/audio`, { headers }), fetch(`/api/media/versions/${version.id}/captions`, { headers })]);
      if (!audio.ok || !captions.ok) throw new Error('Preview assets are unavailable');
      if (audioUrl) URL.revokeObjectURL(audioUrl); if (captionsUrl) URL.revokeObjectURL(captionsUrl);
      setAudioUrl(URL.createObjectURL(await audio.blob())); setCaptionsUrl(URL.createObjectURL(await captions.blob()));
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Preview failed'); } finally { setLoading(false); }
  }
  if (version.processing_state !== 'READY') return <p className="text-sm text-slate-400">Preview becomes available after validation and caption generation.</p>;
  return <section aria-labelledby={`preview-${version.id}`} className="rounded-xl bg-slate-950 p-4">
    <h4 id={`preview-${version.id}`} className="font-semibold">Accessible preview</h4>
    {!audioUrl && <button className="mt-3 rounded bg-cyan-400 px-3 py-2 text-sm font-bold text-slate-950" onClick={load} disabled={loading}>{loading ? 'Loading…' : 'Load authenticated preview'}</button>}
    {audioUrl && <audio className="mt-3 w-full" controls preload="metadata" src={audioUrl}><track kind="captions" src={captionsUrl} srcLang="en" label="Human-supplied transcript" default />Your browser does not support audio playback.</audio>}
    <p className="mt-3 whitespace-pre-wrap text-sm text-slate-300"><strong>Transcript:</strong> {version.transcript}</p>
    {error && <p className="mt-2 text-sm text-rose-300" role="alert">{error}</p>}
  </section>;
}

export default function MediaWorkflow() {
  const [token, setToken] = useState(() => localStorage.getItem(storageKey) || ''); const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]); const [selectedId, setSelectedId] = useState(''); const [versions, setVersions] = useState<Version[]>([]);
  const [message, setMessage] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  const [uploadMode, setUploadMode] = useState<'new' | 'version'>('new'); const [title, setTitle] = useState(''); const [language, setLanguage] = useState('en'); const [transcript, setTranscript] = useState(''); const [file, setFile] = useState<File | null>(null);
  const [reason, setReason] = useState(''); const [exportData, setExportData] = useState(''); const [selectedVersionId, setSelectedVersionId] = useState('');
  const selectedVersion = versions.find((item) => String(item.id) === selectedVersionId) || versions[0];
  const creator = user?.role === 'CREATOR' || user?.role === 'ADMIN'; const reviewer = user?.role === 'REVIEWER' || user?.role === 'ADMIN';

  const api = useCallback(async (path: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers); headers.set('Authorization', `Bearer ${token}`);
    const response = await fetch(path, { ...options, headers });
    if (response.status === 401) { localStorage.removeItem(storageKey); setToken(''); setUser(null); throw new Error('Your session expired. Sign in again.'); }
    return responseJson(response);
  }, [token]);
  const loadProjects = useCallback(async () => { const data = await api('/api/media/projects'); setProjects(data.projects); setSelectedId((current) => current || String(data.projects[0]?.id || '')); }, [api]);
  const loadDetail = useCallback(async () => { if (!selectedId) { setVersions([]); return; } const data = await api(`/api/media/projects/${selectedId}`); setVersions(data.versions); setSelectedVersionId((current) => data.versions.some((v: Version) => String(v.id) === current) ? current : String(data.versions[0]?.id || '')); }, [api, selectedId]);

  useEffect(() => { if (!token) return; api('/api/auth/me').then((data) => { setUser(data.user); return loadProjects(); }).catch((cause) => setError(cause.message)); }, [token, api, loadProjects]);
  useEffect(() => { if (!token || !selectedId) return; loadDetail().catch((cause) => setError(cause.message)); }, [token, selectedId, loadDetail]);
  useEffect(() => { if (!versions.some((version) => ['QUEUED', 'RUNNING'].includes(version.job_status))) return; const timer = window.setInterval(() => { loadProjects().catch(() => {}); loadDetail().catch(() => {}); }, 2000); return () => window.clearInterval(timer); }, [versions, loadProjects, loadDetail]);

  function authenticate(nextToken: string, nextUser: User) { localStorage.setItem(storageKey, nextToken); setToken(nextToken); setUser(nextUser); }
  function logout() { localStorage.removeItem(storageKey); setToken(''); setUser(null); setProjects([]); setVersions([]); }
  async function run(action: () => Promise<unknown>, success: string) { setBusy(true); setError(''); setMessage(''); try { await action(); setMessage(success); await loadProjects(); await loadDetail(); } catch (cause) { setError(cause instanceof Error ? cause.message : 'Request failed'); } finally { setBusy(false); } }
  async function upload(event: FormEvent) {
    event.preventDefault(); if (!file) { setError('Select a WAV file.'); return; }
    const form = new FormData(); form.set('audio', file); form.set('title', title); form.set('language', language); form.set('transcript', transcript);
    const path = uploadMode === 'version' && selectedId ? `/api/media/projects/${selectedId}/versions` : '/api/media/projects';
    await run(async () => { const result = await api(path, { method: 'POST', body: form }); setSelectedId(String(result.project.id)); setTitle(''); setTranscript(''); setFile(null); }, 'Upload accepted and queued for validation.');
  }
  async function simpleAction(path: string, success: string, body?: object) { await run(() => api(path, { method: 'POST', headers: body ? { 'Content-Type': 'application/json' } : undefined, body: body ? JSON.stringify(body) : undefined }), success); }
  async function exportManifest(preset: 'web' | 'archive') { setError(''); try { const data = await api(`/api/media/versions/${selectedVersion.id}/export?preset=${preset}`); setExportData(JSON.stringify(data, null, 2)); } catch (cause) { setError(cause instanceof Error ? cause.message : 'Export failed'); } }
  async function verifyAudit() { setError(''); try { const data = await api(`/api/media/projects/${selectedId}/audit`); setMessage(data.chain.valid ? `Audit chain verified across ${data.verifiedGlobalEventCount} events.` : `Audit verification failed at sequence ${data.chain.sequence}.`); } catch (cause) { setError(cause instanceof Error ? cause.message : 'Audit check failed'); } }

  if (!token || !user) return <AuthScreen onAuthenticated={authenticate} />;
  return <div className="min-h-screen bg-slate-950 text-slate-100">
    <header className="border-b border-slate-800 bg-slate-900"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4"><div><h1 className="text-xl font-bold">Sonic media workflow</h1><p className="text-xs text-slate-400">Validated WAV · Human transcript · WebVTT · Independent approval</p></div><div className="text-right text-sm"><p>{user.name} · <strong>{user.role}</strong></p><button className="text-cyan-300 underline" onClick={logout}>Sign out</button></div></div></header>
    <main className="mx-auto grid max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[22rem_1fr]">
      <aside className="space-y-5">
        {creator && <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5" aria-labelledby="upload-heading"><h2 id="upload-heading" className="text-lg font-bold">Upload media package</h2>
          <form className="mt-4 space-y-4" onSubmit={upload}>
            <fieldset><legend className="text-sm font-medium">Destination</legend><label className="mr-4 text-sm"><input type="radio" checked={uploadMode === 'new'} onChange={() => setUploadMode('new')} /> New project</label><label className="text-sm"><input type="radio" checked={uploadMode === 'version'} onChange={() => setUploadMode('version')} disabled={!selectedId} /> Selected project version</label></fieldset>
            <label className="block text-sm">Title<input className="mt-1 w-full rounded border border-slate-600 bg-slate-950 px-3 py-2" value={title} onChange={(event) => setTitle(event.target.value)} minLength={2} maxLength={160} required /></label>
            <label className="block text-sm">BCP-47 language tag<input className="mt-1 w-full rounded border border-slate-600 bg-slate-950 px-3 py-2" value={language} onChange={(event) => setLanguage(event.target.value)} minLength={2} maxLength={20} required /></label>
            <label className="block text-sm">Canonical WAV<input className="mt-1 block w-full text-sm" type="file" accept=".wav,audio/wav" onChange={(event) => setFile(event.target.files?.[0] || null)} required /></label>
            <p className="text-xs text-slate-400">PCM 16-bit, mono/stereo, 8–48 kHz, 0.1–600 seconds, up to 5 MiB. File signature and structure are validated.</p>
            <label className="block text-sm">Human-supplied transcript<textarea className="mt-1 min-h-32 w-full rounded border border-slate-600 bg-slate-950 px-3 py-2" value={transcript} onChange={(event) => setTranscript(event.target.value)} maxLength={20000} required /></label>
            <p className="text-xs text-amber-200">This workflow does not transcribe audio. You assert that the text is human supplied and that you are authorized to process the media.</p>
            <button className="w-full rounded bg-cyan-400 px-3 py-2 font-bold text-slate-950 disabled:opacity-60" disabled={busy}>Queue package</button>
          </form>
        </section>}
        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5" aria-labelledby="projects-heading"><h2 id="projects-heading" className="text-lg font-bold">Projects</h2><button className="mt-2 text-sm text-cyan-300 underline" onClick={() => loadProjects().catch((cause) => setError(cause.message))}>Refresh list</button>
          <ul className="mt-3 space-y-2">{projects.map((project) => <li key={project.id}><button className={`w-full rounded-lg border p-3 text-left ${String(project.id) === selectedId ? 'border-cyan-300 bg-slate-800' : 'border-slate-700'}`} onClick={() => setSelectedId(String(project.id))}><span className="block font-semibold">{project.title}</span><span className="text-xs text-slate-400">{project.language} · v{project.version_number || '—'} · {project.processing_state || 'empty'} · {project.review_state || '—'}</span></button></li>)}</ul>
          {!projects.length && <p className="mt-3 text-sm text-slate-400">No accessible projects.</p>}
        </section>
      </aside>
      <section className="min-w-0 rounded-2xl border border-slate-700 bg-slate-900 p-5" aria-labelledby="versions-heading"><div className="flex flex-wrap items-center justify-between gap-3"><h2 id="versions-heading" className="text-xl font-bold">Version timeline</h2>{selectedId && <button className="text-sm text-cyan-300 underline" onClick={verifyAudit}>Verify audit chain</button>}</div>
        <div className="mt-3 min-h-6" aria-live="polite">{message && <p className="text-sm text-emerald-300">{message}</p>}{error && <p className="text-sm text-rose-300" role="alert">{error}</p>}</div>
        {!versions.length && <p className="mt-6 text-slate-400">Select a project to inspect its versions.</p>}
        <div className="mt-4 space-y-5">{versions.map((version) => <article key={version.id} className={`rounded-xl border p-4 ${String(version.id) === String(selectedVersion?.id) ? 'border-cyan-500' : 'border-slate-700'}`}>
          <button className="w-full text-left" onClick={() => { setSelectedVersionId(String(version.id)); setExportData(''); }}><h3 className="font-bold">Version {version.version_number}</h3><p className="mt-1 text-sm text-slate-300">Processing: <strong>{version.processing_state}</strong> · Review: <strong>{version.review_state}</strong> · Job: {version.job_status} ({version.attempts}/{version.max_attempts} attempts)</p><p className="mt-1 break-all text-xs text-slate-400">{version.source_filename} · {version.size_bytes} bytes · SHA-256 {version.content_sha256}</p></button>
          {version.error_code && <p className="mt-2 text-sm text-rose-300">{version.error_code}: {version.error_message}</p>}
          <div className="mt-3 flex flex-wrap gap-2">
            {['QUEUED', 'RUNNING'].includes(version.job_status) && creator && <button className="rounded border border-rose-400 px-3 py-1 text-sm" disabled={busy} onClick={() => simpleAction(`/api/media/jobs/${version.job_id}/cancel`, 'Cancellation requested.')}>Cancel job</button>}
            {version.job_status === 'FAILED' && creator && version.attempts < version.max_attempts && <button className="rounded border border-cyan-300 px-3 py-1 text-sm" disabled={busy} onClick={() => simpleAction(`/api/media/jobs/${version.job_id}/retry`, 'Job queued for retry.')}>Retry job</button>}
            {version.processing_state === 'READY' && version.review_state === 'DRAFT' && creator && <button className="rounded border border-cyan-300 px-3 py-1 text-sm" disabled={busy} onClick={() => simpleAction(`/api/media/versions/${version.id}/submit`, 'Version submitted for independent review.')}>Submit for review</button>}
            {version.review_state === 'APPROVED' && <><button className="rounded border border-emerald-300 px-3 py-1 text-sm" onClick={() => exportManifest('web')}>Web export manifest</button><button className="rounded border border-emerald-300 px-3 py-1 text-sm" onClick={() => exportManifest('archive')}>Archive export manifest</button></>}
          </div>
          {String(version.id) === String(selectedVersion?.id) && <div className="mt-4 space-y-4"><Preview token={token} version={version} />
            {reviewer && version.review_state === 'IN_REVIEW' && <form className="rounded-xl bg-slate-950 p-4" onSubmit={(event) => event.preventDefault()}><label className="block text-sm">Decision rationale<textarea className="mt-1 min-h-24 w-full rounded border border-slate-600 bg-slate-900 px-3 py-2" value={reason} onChange={(event) => setReason(event.target.value)} minLength={10} maxLength={1000} required /></label><div className="mt-3 flex gap-2"><button className="rounded bg-emerald-400 px-3 py-2 font-bold text-slate-950" disabled={busy || reason.trim().length < 10} onClick={() => simpleAction(`/api/media/versions/${version.id}/decision`, 'Version approved.', { decision: 'APPROVED', reason })}>Approve</button><button className="rounded bg-rose-400 px-3 py-2 font-bold text-slate-950" disabled={busy || reason.trim().length < 10} onClick={() => simpleAction(`/api/media/versions/${version.id}/decision`, 'Version rejected.', { decision: 'REJECTED', reason })}>Reject</button></div></form>}
          </div>}
        </article>)}</div>
        {exportData && <section className="mt-5" aria-labelledby="export-heading"><h3 id="export-heading" className="font-bold">Approved export manifest</h3><pre className="mt-2 max-h-96 overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-300">{exportData}</pre></section>}
      </section>
    </main>
  </div>;
}
