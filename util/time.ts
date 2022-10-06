export function getFormattedTime(ms: number) {
  const date = new Date(ms)
  return `${date.getMinutes()}:${date.getSeconds()}`
}

export function addDays(date: Date, days: number) {
  date.setDate(date.getDate() + days)
  return new Date(date)
}
