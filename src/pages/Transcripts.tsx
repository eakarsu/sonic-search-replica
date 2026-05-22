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
                    className="py-3 flex justify-between items-start gap-4"
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
                      onClick={() => handleDelete(t.id)}
                    >
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </ScrollArea>
      <Footer />
    </div>
  );
};

export default Transcripts;
