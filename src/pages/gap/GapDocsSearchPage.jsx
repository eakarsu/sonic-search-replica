// === Batch 11 Gaps & Frontend Mounts ===
import GapFeaturePage from '../../components/GapFeaturePage'
export default function GapDocsSearchPage() {
  return (
    <GapFeaturePage
      title="Documentation Search"
      description="Documentation Search"
      slug="docs-search"
      aiResultKey="results"
      fields={[
  {
    "name": "query",
    "label": "Query",
    "required": true,
    "placeholder": ""
  }
]}
    />
  )
}
