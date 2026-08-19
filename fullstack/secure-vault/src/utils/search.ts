function globToRegex(pattern: string): RegExp {
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')
  return new RegExp(`^${escaped}$`, 'i')
}

export function matchesGlob(name: string, pattern: string): boolean {
  const query = pattern.trim()
  if (!query) return true
  const wildcardPattern = query.includes('*') ? query : `*${query}*`
  return globToRegex(wildcardPattern).test(name)
}