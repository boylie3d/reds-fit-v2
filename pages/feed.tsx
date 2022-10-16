import AppLayout from "components/layout/appLayout"
import ResultList from "components/result/resultList"
import { useResults } from "hooks/result"

export default function TeamPage() {
  const { results, loading, error } = useResults()

  return (
    <AppLayout>
      <ResultList results={results} />
    </AppLayout>
  )
}
