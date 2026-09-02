import { VERDICT_MATCH } from '../file.const'
import type { File } from '../file.types'

export const getVerdict = (
  verdict: File['verdict'],
): { id: string; text: string } => {
  if (!verdict) return { id: 'undefined', text: 'Sin veredicto' }
  return { id: verdict.toLowerCase(), text: VERDICT_MATCH[verdict] }
}
