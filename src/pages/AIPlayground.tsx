import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";

// Minimal AI Playground — wires the Vite/React frontend to the Express
// backend at backend/routes/ai.js.  All endpoints require a JWT obtained
// from /api/auth/login; this page reads it from localStorage('token').
//
// Endpoints surfaced (subset of the 12 in backend/routes/ai.js):
//   POST /api/ai/intent-classify
//   POST /api/ai/voice-search-rewrite
//   POST /api/ai/asr-correct

const API_BASE =
  (import.meta as unknown as { env?: { VITE_API_BASE?: string } }).env
    ?.VITE_API_BASE || "http://localhost:3001";

type EndpointKey =
  | "intent-classify"
  | "voice-search-rewrite"
  | "asr-correct"
  | "entity-extract"
  | "wakeword-suggest"
  | "custom-domain-train"
  | "dialog-respond"
  | "summarize-call"
  | "voice-command-route"
  | "transcript-redact"
  | "accent-locale-suggest"
  | "false-trigger-analyze";

const ENDPOINTS: Record<
  EndpointKey,
  {
    label: string;
    description: string;
    path: string;
    inputs: { name: string; label: string; placeholder: string; multiline?: boolean; required?: boolean }[];
  }
> = {
  "intent-classify": {
    label: "Intent Classify",
    description:
      "Classify a spoken utterance into search / command / question / navigation / transaction.",
    path: "/api/ai/intent-classify",
    inputs: [
      {
        name: "transcript",
        label: "Transcript",
        placeholder: "e.g. play some jazz in the living room",
        multiline: true,
      },
      { name: "language", label: "Language", placeholder: "en-US" },
      { name: "domain", label: "Domain (optional)", placeholder: "smart_home" },
    ],
  },
  "voice-search-rewrite": {
    label: "Voice Search Rewrite",
    description: "Rewrite a spoken query into an optimised search query.",
    path: "/api/ai/voice-search-rewrite",
    inputs: [
      {
        name: "spokenQuery",
        label: "Spoken Query",
        placeholder: "umm find me something like a cheap thai place near downtown",
        multiline: true,
      },
      { name: "searchDomain", label: "Search Domain", placeholder: "local_business" },
      { name: "locale", label: "Locale", placeholder: "en-US" },
    ],
  },
  "asr-correct": {
    label: "ASR Correct",
    description:
      "Fix homophones / punctuation in raw ASR output, optionally using n-best hypotheses.",
    path: "/api/ai/asr-correct",
    inputs: [
      {
        name: "rawTranscript",
        label: "Raw transcript",
        placeholder: "their going to the store too by sum bred",
        multiline: true,
      },
      {
        name: "alternativeHypotheses",
        label: "Alternative Hypotheses (optional)",
        placeholder: "they're going to the store too to buy some bread",
        multiline: true,
      },
      { name: "domain", label: "Domain (optional)", placeholder: "general" },
    ],
  },
  "entity-extract": {
    label: "Entity Extract",
    description: "Extract slots/entities (person/location/datetime/etc.) with span offsets.",
    path: "/api/ai/entity-extract",
    inputs: [
      {
        name: "transcript",
        label: "Transcript",
        placeholder: "Book a table for two at Luigi's tomorrow at 7pm",
        multiline: true,
      },
    ],
  },
  "wakeword-suggest": {
    label: "Wake-word Suggest",
    description: "Suggest custom wake-words with phonetic-distinctiveness scoring.",
    path: "/api/ai/wakeword-suggest",
    inputs: [
      { name: "brand", label: "Brand", placeholder: "e.g. Acme" },
      { name: "productName", label: "Product Name", placeholder: "voice assistant" },
      { name: "language", label: "Language", placeholder: "en-US" },
      { name: "tone", label: "Tone", placeholder: "friendly" },
    ],
  },
  "custom-domain-train": {
    label: "Custom Domain Train",
    description: "Generate training utterances + BIO-annotated slot examples for a custom domain.",
    path: "/api/ai/custom-domain-train",
    inputs: [
      { name: "domainName", label: "Domain Name", placeholder: "smart_kitchen" },
      {
        name: "description",
        label: "Description",
        placeholder: "Voice control for kitchen appliances",
        multiline: true,
      },
    ],
  },
  "dialog-respond": {
    label: "Dialog Respond",
    description: "Generate the next assistant turn (SSML + plain text).",
    path: "/api/ai/dialog-respond",
    inputs: [
      {
        name: "conversation",
        label: "Conversation history",
        placeholder: "User: Play some jazz\\nAssistant: Sure, any artist?\\nUser: Coltrane",
        multiline: true,
      },
      { name: "persona", label: "Persona", placeholder: "helpful, concise, friendly" },
      { name: "latencyTier", label: "Latency Tier", placeholder: "standard or low_latency" },
    ],
  },
  "summarize-call": {
    label: "Summarize Call",
    description: "Contact-center call summariser with compliance flags.",
    path: "/api/ai/summarize-call",
    inputs: [
      {
        name: "transcript",
        label: "Call Transcript",
        placeholder: "Agent: How can I help?\\nCaller: My order hasn't arrived...",
        multiline: true,
      },
      { name: "callType", label: "Call Type", placeholder: "support, sales, billing" },
    ],
  },
  "voice-command-route": {
    label: "Voice Command Route",
    description: "Route a command to the correct skill, with disambiguation prompts.",
    path: "/api/ai/voice-command-route",
    inputs: [
      {
        name: "transcript",
        label: "Command Transcript",
        placeholder: "set a 5 minute timer and play music",
        multiline: true,
      },
    ],
  },
  "transcript-redact": {
    label: "Transcript Redact",
    description: "PII redaction with typed placeholders and jurisdiction awareness.",
    path: "/api/ai/transcript-redact",
    inputs: [
      {
        name: "transcript",
        label: "Transcript",
        placeholder: "Hi, this is John Doe, my number is 555-1234.",
        multiline: true,
      },
      { name: "jurisdiction", label: "Jurisdiction", placeholder: "US, EU-GDPR, US-HIPAA" },
    ],
  },
  "accent-locale-suggest": {
    label: "Accent / Locale Suggest",
    description: "Recommend acoustic / locale model from text cues.",
    path: "/api/ai/accent-locale-suggest",
    inputs: [
      {
        name: "sampleTranscript",
        label: "Sample Transcript",
        placeholder: "Reckon I'll fetch the messages from the boot",
        multiline: true,
      },
      { name: "declaredLocale", label: "Declared Locale", placeholder: "en-AU" },
      { name: "deviceRegion", label: "Device Region", placeholder: "AU" },
    ],
  },
  "false-trigger-analyze": {
    label: "False-Trigger Analyze",
    description: "Root-cause analysis for wake-word false triggers.",
    path: "/api/ai/false-trigger-analyze",
    inputs: [
      { name: "wakeWord", label: "Wake Word", placeholder: "Hey Acme" },
      {
        name: "surroundingTranscript",
        label: "Surrounding Transcript",
        placeholder: "5 seconds of TV audio around the false trigger",
        multiline: true,
      },
      { name: "deviceType", label: "Device Type", placeholder: "smart_speaker, headphones" },
    ],
  },
};

type Tab = "playground" | "signin" | "history";

const AIPlayground = () => {
  const [tab, setTab] = useState<Tab>("playground");
  const [endpoint, setEndpoint] = useState<EndpointKey>("intent-classify");
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<unknown>(null);

  // Sign-in tab state
  const [siEmail, setSiEmail] = useState("");
  const [siPassword, setSiPassword] = useState("");
  const [siLoading, setSiLoading] = useState(false);
  const [siMessage, setSiMessage] = useState<string | null>(null);
  const [tokenPresent, setTokenPresent] = useState<boolean>(
    typeof window !== "undefined" ? !!localStorage.getItem("token") : false
  );

  // History tab state
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [historyData, setHistoryData] = useState<unknown>(null);

  const config = ENDPOINTS[endpoint];

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSiLoading(true);
    setSiMessage(null);
    try {
      const r = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: siEmail, password: siPassword }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) {
        setSiMessage(d.error || `Login failed (HTTP ${r.status})`);
        return;
      }
      if (d.token) {
        localStorage.setItem("token", d.token);
        if (d.user) localStorage.setItem("user", JSON.stringify(d.user));
        setTokenPresent(true);
        setSiMessage("Signed in. Token saved to localStorage.");
      } else {
        setSiMessage("Login response had no token.");
      }
    } catch (err) {
      setSiMessage(err instanceof Error ? err.message : "Network error");
    } finally {
      setSiLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setTokenPresent(false);
    setSiMessage("Signed out.");
  };

  const fetchHistory = async () => {
    setHistoryLoading(true);
    setHistoryError(null);
    setHistoryData(null);
    const token = localStorage.getItem("token");
    if (!token) {
      setHistoryError("Sign in first to view AI history.");
      setHistoryLoading(false);
      return;
    }
    try {
      const r = await fetch(`${API_BASE}/api/ai/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const d = await r.json().catch(() => ({}));
      if (r.status === 503) {
        setHistoryError(d.error || "AI not configured.");
        return;
      }
      if (!r.ok) {
        setHistoryError(d.error || `History failed (HTTP ${r.status})`);
        return;
      }
      setHistoryData(d);
    } catch (err) {
      setHistoryError(err instanceof Error ? err.message : "Network error");
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must sign in first to obtain a JWT token.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}${config.path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 503) {
        setError(
          data.error ||
            "AI not configured: backend is missing OPENROUTER_API_KEY."
        );
        return;
      }

      if (!response.ok) {
        setError(data.error || `Request failed (HTTP ${response.status})`);
        return;
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">AI Playground</h1>
            <p className="text-gray-600 mb-4">
              Try the voice-AI endpoints exposed by this backend. Sign in first
              to get a JWT (saved to <code>localStorage.token</code>); endpoints
              return 503 if <code>OPENROUTER_API_KEY</code> is not configured on
              the server.
            </p>

            <div className="flex gap-2 mb-6 border-b">
              {(["playground", "signin", "history"] as Tab[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setTab(t);
                    if (t === "history") fetchHistory();
                  }}
                  className={`px-4 py-2 text-sm font-medium ${
                    tab === t
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {t === "playground" ? "Playground" : t === "signin" ? "Sign-in" : "History"}
                  {t === "signin" && tokenPresent ? " ✓" : ""}
                </button>
              ))}
            </div>

            {tab === "signin" && (
              <div className="bg-white p-6 rounded-lg shadow border mb-6">
                <h2 className="text-lg font-semibold mb-2">Backend sign-in</h2>
                <p className="text-sm text-gray-500 mb-4">
                  POSTs <code>/api/auth/login</code> on the Express backend and
                  saves the returned JWT to <code>localStorage.token</code>.
                </p>
                <form onSubmit={handleSignIn} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      className="w-full border rounded px-3 py-2"
                      type="email"
                      value={siEmail}
                      onChange={(e) => setSiEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                      className="w-full border rounded px-3 py-2"
                      type="password"
                      value={siPassword}
                      onChange={(e) => setSiPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={siLoading}>
                      {siLoading ? "Signing in..." : "Sign In"}
                    </Button>
                    {tokenPresent && (
                      <Button type="button" variant="outline" onClick={handleSignOut}>
                        Sign Out
                      </Button>
                    )}
                  </div>
                </form>
                {siMessage && (
                  <div className="mt-3 text-sm text-gray-700">{siMessage}</div>
                )}
              </div>
            )}

            {tab === "history" && (
              <div className="bg-white p-6 rounded-lg shadow border mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold">AI History</h2>
                  <Button type="button" variant="outline" onClick={fetchHistory} disabled={historyLoading}>
                    {historyLoading ? "Loading..." : "Refresh"}
                  </Button>
                </div>
                {historyError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-3 text-sm">
                    {historyError}
                  </div>
                )}
                {historyData !== null && historyData !== undefined && (
                  <pre className="bg-gray-50 border rounded p-4 text-xs overflow-auto whitespace-pre-wrap max-h-[480px]">
                    {JSON.stringify(historyData, null, 2)}
                  </pre>
                )}
              </div>
            )}

            {tab === "playground" && (
            <>
            <div className="bg-white p-6 rounded-lg shadow border mb-6">
              <label className="block text-sm font-medium mb-2">Endpoint</label>
              <select
                className="w-full border rounded px-3 py-2 mb-4"
                value={endpoint}
                onChange={(e) => {
                  setEndpoint(e.target.value as EndpointKey);
                  setValues({});
                  setResult(null);
                  setError(null);
                }}
              >
                {Object.entries(ENDPOINTS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mb-4">{config.description}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {config.inputs.map((input) => (
                  <div key={input.name}>
                    <label className="block text-sm font-medium mb-1">
                      {input.label}
                    </label>
                    {input.multiline ? (
                      <textarea
                        className="w-full border rounded px-3 py-2"
                        rows={4}
                        placeholder={input.placeholder}
                        value={values[input.name] || ""}
                        onChange={(e) => handleChange(input.name, e.target.value)}
                        required={input.required !== false && /Transcript|Query|transcript|Utterance|Wake Word|Conversation/.test(input.label)}
                      />
                    ) : (
                      <input
                        className="w-full border rounded px-3 py-2"
                        type="text"
                        placeholder={input.placeholder}
                        value={values[input.name] || ""}
                        onChange={(e) => handleChange(input.name, e.target.value)}
                        required={input.required === true}
                      />
                    )}
                  </div>
                ))}

                <Button type="submit" disabled={loading}>
                  {loading ? "Running..." : "Run"}
                </Button>
              </form>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-4">
                {error}
              </div>
            )}

            {result !== null && result !== undefined && (
              <div className="bg-white p-6 rounded-lg shadow border">
                <h2 className="text-lg font-semibold mb-3">Result</h2>
                <pre className="bg-gray-50 border rounded p-4 text-xs overflow-auto whitespace-pre-wrap">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
            </>
            )}
          </div>
        </main>
      </ScrollArea>
      <Footer />
    </div>
  );
};

export default AIPlayground;
