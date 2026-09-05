// This app is deployed as its own dedicated site at the domain root
// (mukesh.tettesthub.in), so the public base is always empty. Kept as a
// function (rather than inlining '/path' everywhere) so asset() stays a
// single place to change if that ever stops being true.
export function getPublicBase(): string {
  return ''
}

export function asset(path: string): string {
  return `${getPublicBase()}${path}`
}
