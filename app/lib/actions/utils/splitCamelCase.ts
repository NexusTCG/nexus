export function splitCamelCase(
  word: string
) {
  return word.split(/(?=[A-Z])/).join(" ");
}