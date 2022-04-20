export function tryParseJson(text: string) {
  try {
    return JSON.parse(text)
  } catch (error) {
    return text
  }
}
