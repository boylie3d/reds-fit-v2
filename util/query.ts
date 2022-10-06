export function objToQueryString(query?: { [key: string]: string }) {
  return query
    ? `?${Object.keys(query)
        .map((key, index) => `${key}=${query[key].toString()}`)
        .join("&")}`
    : ""
}

export function objToFirestoreQuery(
  ref: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
  query: Object,
) {
  if (Object.keys(query).length === 0) return ref

  let queryHolder: any = null
  Object.keys(query).forEach(key => {
    const lastQuery = queryHolder === null ? ref : queryHolder
    const thisQuery = lastQuery.where(key, "==", (query as any)[key])
    queryHolder = thisQuery
  })

  return queryHolder as FirebaseFirestore.Query
}
