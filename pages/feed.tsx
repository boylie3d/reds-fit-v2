import AppLayout from "components/layout/appLayout"
import LoadingPane from "components/misc/loading"
import ResultList from "components/result/resultList"
import { useResults } from "hooks/result"

import { NextPage } from "next"

const Feed: NextPage = () => {
  const { results, loading, error } = useResults()

  if (loading) return <LoadingPane />

  return (
    <AppLayout>
      <>{results && results.length > 0 && <ResultList results={results} />}</>
    </AppLayout>
  )
}

export default Feed
