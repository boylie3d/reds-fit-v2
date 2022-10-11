import ResultForm from "components/result/resultForm"
import { useResults } from "hooks/result"

export default function PageTest() {
  const { results, loading, error } = useResults()

  if (!results || results.length === 0) return <div>nufin</div>

  return <div>{results ? <ResultForm result={results[0]} /> : <div />}</div>
}
