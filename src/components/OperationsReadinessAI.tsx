import { useEffect, useRef, useState } from 'react';
import OperationsAIReport from './OperationsAIReport';

const examples = [
  { label: 'Evidence and access', text: 'A deidentified media workflow accepts validated WAV files and a human-supplied transcript. Authenticated creators upload versions; independent authorized reviewers assess accessibility and release readiness. Immutable audit events record each action. Review access controls, evidence completeness and reviewer separation. Do not infer speaker identity or meaning and do not approve a release.' },
  { label: 'Retries and cancellation', text: 'A deidentified media workflow validates uploads, generates WebVTT from a human-supplied transcript and tracks queued or running jobs. Creators may request cancellation or bounded retries after failures. Independent reviewers decide releases. Review retry traceability, cancellation records and failure recovery. Do not infer speaker identity or meaning and do not approve a release.' },
  { label: 'Accessibility review', text: 'A deidentified media workflow provides an authenticated audio preview with captions based on a human-supplied transcript. Immutable versions retain original evidence, accessibility findings and independent reviewer decisions. Review access to preview assets, caption review, audit completeness and export traceability. Do not infer speaker identity or meaning and do not approve a release.' },
];

type ReadinessResult = { analysisId: number; createdAt: string; result: string; providerReceipt: { requestId: string; model: string; usage?: { total_tokens?: number } } };
type SavedReport = { id: number; created_at: string; input: { workflowSummary?: string }; provider_model: string; result_text: string };

export default function OperationsReadinessAI({ token }: { token: string }) {
  const [workflowSummary, setWorkflowSummary] = useState('');
  const [result, setResult] = useState<ReadinessResult | null>(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<SavedReport[]>([]);
  const [historyError, setHistoryError] = useState('');
  const [historyLoading, setHistoryLoading] = useState(false);
  const request = useRef<AbortController | null>(null);

  useEffect(() => {
    setResult(null); setError(''); setStatus(''); setLoading(false); setHistory([]);
    return () => { request.current?.abort(); request.current = null; };
  }, [token]);

  function cancel() {
    if (request.current) {
      request.current.abort(); request.current = null; setLoading(false); setResult(null); setError('');
      setStatus('Request canceled. Your summary is ready to edit.');
    } else { setWorkflowSummary(''); setResult(null); setError(''); setStatus(''); }
  }

  async function loadHistory() {
    setHistoryLoading(true); setHistoryError('');
    try {
      const response = await fetch('/api/runtime-ai/operations-readiness/history', { headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || `History unavailable (HTTP ${response.status}).`);
      setHistory(data.results);
    } catch (cause) { setHistoryError(cause instanceof Error ? cause.message : 'History unavailable.'); }
    finally { setHistoryLoading(false); }
  }

  async function generate(event: React.FormEvent) {
    event.preventDefault();
    if (request.current) return;
    setError(''); setResult(null); setStatus('');
    if (!token) { setError('Sign in to review operations readiness.'); return; }
    const summary = workflowSummary.trim();
    if (summary.length < 10 || summary.length > 1000) { setError('Enter a workflow summary between 10 and 1,000 characters.'); return; }
    const controller = new AbortController(); request.current = controller; setLoading(true);
    try {
      const response = await fetch('/api/runtime-ai/operations-readiness', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ workflowSummary: summary }), signal: controller.signal,
      });
      const data = await response.json();
      if (controller.signal.aborted) return;
      if (!response.ok) throw new Error(data.error || `Could not generate the report (HTTP ${response.status}).`);
      if (!data.result || !data.providerReceipt?.requestId) throw new Error('The server did not return a verified AI report.');
      setResult(data);
      void loadHistory();
    } catch (cause) {
      if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : 'Could not generate the report.');
    } finally {
      if (request.current === controller) { request.current = null; setLoading(false); }
    }
  }

  return <section className="rounded-xl border border-slate-700 bg-slate-900 p-5" aria-labelledby="operations-ai-title">
    <h2 id="operations-ai-title" className="text-lg font-semibold">AI operations readiness</h2>
    <p className="mt-2 text-sm text-slate-300">Review access, evidence, retries and accessibility controls. Authorized reviewers approve releases in the media workflow.</p>
    <div className="my-4 flex flex-wrap gap-2" aria-label="Complete examples">
      {examples.map(example => <button key={example.label} type="button" disabled={loading} className="rounded border border-cyan-700 px-3 py-2 text-sm text-cyan-200 disabled:opacity-50"
        onClick={() => { setWorkflowSummary(example.text); setResult(null); setError(''); setStatus('The complete summary is filled. Review it, then generate with OpenRouter.'); }}>Fill: {example.label}</button>)}
    </div>
    <form onSubmit={generate}>
      <label htmlFor="operations-workflow-summary" className="mb-2 block text-sm font-medium">Deidentified workflow summary</label>
      <textarea id="operations-workflow-summary" value={workflowSummary} onChange={event => setWorkflowSummary(event.target.value)} disabled={loading}
        rows={5} minLength={10} maxLength={1000} required className="w-full rounded border border-slate-600 bg-slate-950 p-3 text-sm text-slate-100" />
      <div className="mt-3 flex flex-wrap gap-3">
        <button type="submit" disabled={loading} className="rounded bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 disabled:opacity-50">{loading ? 'Generating…' : 'Generate with OpenRouter'}</button>
        <button type="button" onClick={cancel} className="rounded border border-slate-500 px-4 py-2 text-sm">{loading ? 'Cancel request' : 'Cancel'}</button>
      </div>
    </form>
    {status && <p role="status" className="mt-3 text-sm text-slate-300">{status}</p>}
    {error && <p role="alert" className="mt-3 text-sm text-rose-300">{error}</p>}
    {result && <div className="mt-5 rounded-lg bg-white p-4 text-slate-900">
      <OperationsAIReport value={result.result} title="Operations readiness report" />
      <p className="mt-3 text-xs text-slate-600">Model: {result.providerReceipt.model} · Request: {result.providerReceipt.requestId} · Saved report #{result.analysisId}</p>
    </div>}
    <div className="mt-5 border-t border-slate-700 pt-4">
      <button type="button" onClick={loadHistory} disabled={historyLoading} className="rounded border border-cyan-700 px-3 py-2 text-sm text-cyan-200 disabled:opacity-50">{historyLoading ? 'Loading saved reports…' : 'View saved reports'}</button>
      {historyError && <p role="alert" className="mt-2 text-sm text-rose-300">{historyError}</p>}
      {!historyLoading && history.length === 0 && !historyError && <p className="mt-2 text-xs text-slate-400">Select “View saved reports” to load your history.</p>}
      <div className="mt-3 space-y-3">{history.map(saved => <details key={saved.id} className="rounded-lg border border-slate-700 bg-white p-3 text-slate-900">
        <summary className="cursor-pointer text-sm font-medium">Report #{saved.id} · {new Date(saved.created_at).toLocaleString()} · {saved.provider_model}</summary>
        {saved.input?.workflowSummary && <p className="mt-3 whitespace-pre-wrap text-sm">{saved.input.workflowSummary}</p>}
        <OperationsAIReport value={saved.result_text} title={`Saved operations readiness report #${saved.id}`} />
      </details>)}</div>
    </div>
  </section>;
}
