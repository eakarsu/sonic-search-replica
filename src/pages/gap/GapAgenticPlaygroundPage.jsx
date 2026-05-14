// === Batch 11 Gaps & Frontend Mounts ===
import GapFeaturePage from '../../components/GapFeaturePage'
export default function GapAgenticPlaygroundPage() {
  return (
    <GapFeaturePage
      title="Agentic Playground"
      description="Agentic Playground"
      slug="agentic-playground"
      aiResultKey="reasoning"
      fields={[
  {
    "name": "prompt",
    "label": "Prompt",
    "type": "textarea",
    "rows": 4,
    "required": true
  },
  {
    "name": "tools",
    "label": "Tools",
    "type": "array"
  }
]}
    />
  )
}
