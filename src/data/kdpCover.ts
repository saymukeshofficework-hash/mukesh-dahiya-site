export interface TrimSize {
  key: string
  label: string
  widthIn: number
  heightIn: number
}

/** KDP paperback trim sizes (inches), most common first. */
export const TRIM_SIZES: TrimSize[] = [
  { key: '5x8', label: '5 x 8 in', widthIn: 5, heightIn: 8 },
  { key: '5.06x7.81', label: '5.06 x 7.81 in', widthIn: 5.06, heightIn: 7.81 },
  { key: '5.25x8', label: '5.25 x 8 in', widthIn: 5.25, heightIn: 8 },
  { key: '5.5x8.5', label: '5.5 x 8.5 in', widthIn: 5.5, heightIn: 8.5 },
  { key: '6x9', label: '6 x 9 in (Most common)', widthIn: 6, heightIn: 9 },
  { key: '6.14x9.21', label: '6.14 x 9.21 in', widthIn: 6.14, heightIn: 9.21 },
  { key: '6.69x9.61', label: '6.69 x 9.61 in', widthIn: 6.69, heightIn: 9.61 },
  { key: '7x10', label: '7 x 10 in', widthIn: 7, heightIn: 10 },
  { key: '7.44x9.69', label: '7.44 x 9.69 in', widthIn: 7.44, heightIn: 9.69 },
  { key: '7.5x9.25', label: '7.5 x 9.25 in', widthIn: 7.5, heightIn: 9.25 },
  { key: '8x10', label: '8 x 10 in', widthIn: 8, heightIn: 10 },
  { key: '8.5x8.5', label: '8.5 x 8.5 in', widthIn: 8.5, heightIn: 8.5 },
  { key: '8.5x11', label: '8.5 x 11 in', widthIn: 8.5, heightIn: 11 },
]

export type PaperType = 'white' | 'cream' | 'color'

export const PAPER_TYPES: { key: PaperType; label: string; inPerPage: number }[] = [
  { key: 'white', label: 'White', inPerPage: 0.002252 },
  { key: 'cream', label: 'Cream', inPerPage: 0.0025 },
  { key: 'color', label: 'Premium Color', inPerPage: 0.002252 },
]

export const BLEED_IN = 0.125
/** Minimum inset from trim edges that front/back text should stay within. */
export const SAFE_MARGIN_IN = 0.25
/** Minimum inset from the spine fold lines that spine text should stay within. */
export const SPINE_SAFE_MARGIN_IN = 0.0625

export const MIN_PAGE_COUNT = 24
export const MAX_PAGE_COUNT = 828
/** Below this page count KDP does not print spine text (spine too narrow). */
export const MIN_PAGES_FOR_SPINE_TEXT = 100

export function getPaperType(key: PaperType) {
  return PAPER_TYPES.find((p) => p.key === key) ?? PAPER_TYPES[0]
}

export function getTrimSize(key: string) {
  return TRIM_SIZES.find((t) => t.key === key) ?? TRIM_SIZES[4]
}

/** Spine width in inches, per KDP's published paperback formula. */
export function computeSpineWidthIn(pageCount: number, paperType: PaperType): number {
  const pages = Math.max(0, Math.round(pageCount))
  if (pages < MIN_PAGE_COUNT) return 0
  return pages * getPaperType(paperType).inPerPage
}

export interface WrapDimensions {
  trimW: number
  trimH: number
  spineW: number
  bleed: number
  wrapW: number
  wrapH: number
  backX: number
  spineX: number
  frontX: number
}

export function computeWrapDimensions(trimKey: string, pageCount: number, paperType: PaperType): WrapDimensions {
  const trim = getTrimSize(trimKey)
  const spineW = computeSpineWidthIn(pageCount, paperType)
  const bleed = BLEED_IN
  const wrapW = bleed * 2 + trim.widthIn * 2 + spineW
  const wrapH = trim.heightIn + bleed * 2
  return {
    trimW: trim.widthIn,
    trimH: trim.heightIn,
    spineW,
    bleed,
    wrapW,
    wrapH,
    backX: bleed,
    spineX: bleed + trim.widthIn,
    frontX: bleed + trim.widthIn + spineW,
  }
}
