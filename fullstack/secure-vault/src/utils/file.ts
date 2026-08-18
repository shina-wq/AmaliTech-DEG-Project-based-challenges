export function getFileType(filename: string): string {
  const parts = filename.split('.')
  if (parts.length < 2) return 'FILE'

  const ext = parts.at(-1)
  return ext ? ext.toUpperCase() : 'FILE'
}