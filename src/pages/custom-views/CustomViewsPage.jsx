// CustomViewsPage - "Sonic Views" dashboard
// Renders 4 custom views (2 VIZ + 2 NON-VIZ) for the voice/sonic search domain.
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import QueryLatencyTimeline from '../../components/custom-views/QueryLatencyTimeline'
import AudioQueryTypeHeatmap from '../../components/custom-views/AudioQueryTypeHeatmap'
import QueryHistoryPdf from '../../components/custom-views/QueryHistoryPdf'
import VoiceTuningRulesEditor from '../../components/custom-views/VoiceTuningRulesEditor'

export default function CustomViewsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1, maxWidth: 1100, margin: '0 auto', padding: '24px 16px', width: '100%' }}>
        <div data-testid="cv-page" style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>Sonic Views</h1>
          <p style={{ color: '#6b7280', marginTop: 4 }}>
            Custom dashboards for the voice / sonic-search platform: latency over time, query mix
            by hour, exportable history, and a voice-tuning rules editor.
          </p>
        </div>

        <section style={{ marginBottom: 16 }}>
          <h2 style={sectionTitle}>Visualizations</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <QueryLatencyTimeline />
            <AudioQueryTypeHeatmap />
          </div>
        </section>

        <section style={{ marginBottom: 16 }}>
          <h2 style={sectionTitle}>Operations</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <QueryHistoryPdf />
            <VoiceTuningRulesEditor />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

const sectionTitle = { fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, color: '#6b7280', margin: '12px 0 8px' }
