import { type CSSProperties } from 'react'
import { toKebab } from './toKebab.helper'

type Vars = Record<string, undefined | string | number>

export const varList = (variables: Vars) =>
  Object.entries(variables).reduce<Vars>((acc, [key, value]) => {
    acc[`--${toKebab(key)}`] = value
    return acc
  }, {}) as CSSProperties
