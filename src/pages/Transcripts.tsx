import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";

// Voice Transcripts page — saves user-supplied transcripts to the backend
// voice_transcripts table via /api/transcripts and lets the user list/delete
// them. Requires a JWT (sign in via /ai-playground).
//
// Endpoints:
//   POST   /api/transcripts          { transcript, language?, domain?, confidence? }
//   GET    /api/transcripts          (paginated list)
//   DELETE /api/transcripts/:id

type Transcript = {
  id: number;
  transcript: string;
  language: string | null;
  domain: string | null;
  confidence: string | number | null;
  created_at: string;
};

const API_BASE =
  (import.meta as unknown as { env?: { VITE_API_BASE?: string } }).env
    ?.VITE_API_BASE || "http://localhost:3001";

const Transcripts = () => {
  const [transcript, setTranscript] = useState("");
  const [language, setLanguage] = useState("");
  const [domain, setDomain] = useState("");
  const [confidence, setConfidence] = useState("");

  const [rows, setRows] = useState<Transcript[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [detail, setDetail] = useState<Transcript | null>(null);
  const [confirming, setConfirming] = useState(false);

  const openRow = (row: Transcript) => { setDetail(row); setConfirming(false); };

  const authHeader = () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`${API_BASE}/api/transcripts?limit=50`, {
        headers: { ...authHeader() },
      });
      const d = await r.json().catch(() => ({}));
      if (r.status === 401) {
        setError("Sign in first (via /ai-playground) to view transcripts.");
        setRows([]);
        return;
      }
      if (!r.ok) {
        setError(d.error || `Request failed (HTTP ${r.status})`);
        return;
      }
      setRows(Array.isArray(d.transcripts) ? d.transcripts : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setInfo(null);
    if (!transcript.trim()) {
      setError("transcript is required");
      setSaving(false);
      return;
    }
    try {
      const body: Record<string, unknown> = { transcript };
      if (language.trim()) body.language = language.trim();
      if (domain.trim()) body.domain = domain.trim();
      if (confidence.trim()) body.confidence = Number(confidence);
      const r = await fetch(`${API_BASE}/api/transcripts`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify(body),
      });
      const d = await r.json().catch(() => ({}));
      if (r.status === 401) {
        setError("Sign in first (via /ai-playground) before saving.");
        return;
      }
      if (!r.ok) {
        setError(d.error || `Save failed (HTTP ${r.status})`);
        return;
      }
      setInfo(`Saved transcript #${d.transcript?.id ?? "?"}.`);
      setTranscript("");
      setConfidence("");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    setError(null);
    setInfo(null);
    try {
      const r = await fetch(`${API_BASE}/api/transcripts/${id}`, {
        method: "DELETE",
        headers: { ...authHeader() },
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) {
        setError(d.error || `Delete failed (HTTP ${r.status})`);
        return;
      }
      setInfo(`Deleted transcript #${id}.`);
      setRows((cur) => cur.filter((t) => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Voice Transcripts</h1>
            <p className="text-gray-600 mb-6">
              Save and review voice transcripts stored in the backend
              <code> voice_transcripts</code> table. Requires a JWT (sign in
              via <code>/ai-playground</code>).
            </p>

            <form
              onSubmit={handleSave}
              className="bg-white p-6 rounded-lg shadow border mb-6 space-y-4"
            >
              <h2 className="text-lg font-semibold">Add a transcript</h2>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Transcript *
                </label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  rows={4}
                  required
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder="e.g. play some jazz in the living room"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Language
                  </label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    type="text"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    placeholder="en-US"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Domain
                  </label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="smart_home"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Confidence (0–1)
                  </label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    type="text"
                    value={confidence}
                    onChange={(e) => setConfidence(e.target.value)}
                    placeholder="0.92"
                  />
                </div>
              </div>
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save transcript"}
              </Button>
            </form>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-3 text-sm">
                {error}
              </div>
            )}
            {info && (
              <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded mb-3 text-sm">
                {info}
              </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Saved transcripts</h2>
                <Button
                  type="button"
                  variant="outline"
                  onClick={refresh}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Refresh"}
                </Button>
              </div>
              {rows.length === 0 && !loading && (
                <div className="text-sm text-gray-500">
                  No transcripts yet.
                </div>
              )}
              <ul className="divide-y">
                {rows.map((t) => (
                  <li
                    key={t.id}
                    tabIndex={0}
                    onClick={() => openRow(t)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openRow(t); }
                    }}
                    className="py-3 flex justify-between items-start gap-4 cursor-pointer hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium break-words">
                        {t.transcript}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        #{t.id} · {t.language || "—"} ·{" "}
                        {t.domain || "—"} ·{" "}
                        {t.confidence !== null && t.confidence !== undefined
                          ? `conf ${t.confidence}`
                          : "no conf"}{" "}
                        ·{" "}
                        {t.created_at
                          ? new Date(t.created_at).toLocaleString()
                          : ""}
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={(event) => { event.stopPropagation(); openRow(t); }}
                    >
                      Details
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </ScrollArea>
      <Footer />

      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setDetail(null); }}>
          <div role="dialog" aria-modal="true" aria-label="Transcript details" className="max-h-[85vh] w-[min(36rem,95vw)] overflow-auto rounded-lg border bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Record details</span>
                <h2 className="text-lg font-semibold">Transcript #{detail.id}</h2>
              </div>
              <button type="button" aria-label="Cancel" className="rounded border px-3 py-1 text-sm text-gray-600 hover:bg-gray-50" onClick={() => setDetail(null)}>×</button>
            </div>
            <dl className="space-y-2 text-sm">
              <div className="grid grid-cols-[9rem_1fr] gap-3 border-b py-2"><dt className="font-medium text-gray-500">Transcript</dt><dd className="whitespace-pre-wrap break-words text-gray-800">{detail.transcript}</dd></div>
              <div className="grid grid-cols-[9rem_1fr] gap-3 border-b py-2"><dt className="font-medium text-gray-500">Language</dt><dd className="text-gray-800">{detail.language || "—"}</dd></div>
              <div className="grid grid-cols-[9rem_1fr] gap-3 border-b py-2"><dt className="font-medium text-gray-500">Domain</dt><dd className="text-gray-800">{detail.domain || "—"}</dd></div>
              <div className="grid grid-cols-[9rem_1fr] gap-3 border-b py-2"><dt className="font-medium text-gray-500">Confidence</dt><dd className="text-gray-800">{detail.confidence !== null && detail.confidence !== undefined ? detail.confidence : "—"}</dd></div>
              <div className="grid grid-cols-[9rem_1fr] gap-3 border-b py-2"><dt className="font-medium text-gray-500">Created</dt><dd className="text-gray-800">{detail.created_at ? new Date(detail.created_at).toLocaleString() : "—"}</dd></div>
            </dl>
            {confirming && (
              <div role="alert" className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <strong>Delete transcript #{detail.id}?</strong>
                <div className="mt-3 flex gap-2">
                  <Button type="button" onClick={async () => { const id = detail.id; setDetail(null); setConfirming(false); await handleDelete(id); }}>Delete record</Button>
                  <Button type="button" variant="outline" onClick={() => setConfirming(false)}>Cancel deletion</Button>
                </div>
              </div>
            )}
            <div className="mt-5 flex flex-wrap gap-2">
              <Button type="button" variant="outline" onClick={() => { setTranscript(detail.transcript); setLanguage(detail.language || ""); setDomain(detail.domain || ""); setConfidence(detail.confidence !== null && detail.confidence !== undefined ? String(detail.confidence) : ""); setInfo("Loaded into the form below. The API has no update endpoint, so saving creates a corrected record."); setDetail(null); }}>Edit</Button>
              <Button type="button" variant="outline" onClick={() => setConfirming(true)}>Delete</Button>
              <Button type="button" variant="outline" onClick={() => setDetail(null)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transcripts;
