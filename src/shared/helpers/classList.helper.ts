import { toKebab } from './toKebab.helper'

export const classList = (
  ...values: (
    | undefined
    | string
    | number
    | { [key: string | number]: boolean }
  )[]
) =>
  values
    .filter(item => item !== undefined)
    .map(item => {
      if (typeof item === 'string') return toKebab(item)
      if (typeof item === 'number') return String(item)

      return Object.entries(item)
        .filter(([, value]) => value)
        .map(([key]) => toKebab(String(key)))
        .join(' ')
    })
    .join(' ')
