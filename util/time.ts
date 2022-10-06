export function getFormattedTime(ms: number) {
  const date = new Date(ms)
  return `${date.getMinutes()}:${date.getSeconds()}`
}
