// === Batch 11 Gaps & Frontend Mounts ===
import GapFeaturePage from '../../components/GapFeaturePage'
export default function GapSemanticSearchPage() {
  return (
    <GapFeaturePage
      title="Semantic Search Demo"
      description="Semantic Search Demo"
      slug="semantic-search"
      aiResultKey="results"
      fields={[
  {
    "name": "query",
    "label": "Query",
    "required": true,
    "placeholder": ""
  },
  {
    "name": "corpus",
    "label": "Corpus (JSON array)",
    "type": "json"
  }
]}
    />
  )
}
