import './NumberVerdictTypesChip.css'
import { Chip } from '@/shared/components'
import { VERDICT_MATCH } from '@/features/files/file.const'
import type { VerdictType } from '@/features/files/file.types'
import { classList } from '@/shared/helpers'

interface NumberVerdictTypesChipProps {
  amount: number
  verdict?: VerdictType
}

export const NumberVerdictTypesChip = ({
  amount,
  verdict,
}: NumberVerdictTypesChipProps) => {
  if (verdict) {
    const { id, title } = VERDICT_MATCH[verdict]

    return (
      <Chip
        handlingClass={classList(
          'cmp-number-verdict-types-chip',
          'verdict',
          id,
        )}
        label={`Cantidad de ${title.toLowerCase()}s`}
        value={amount}
      >
        <p>{amount}</p>
        {/* <p>{title}s</p> */}
      </Chip>
    )
  }

  return <Chip label="Cantidad de controles" value={amount} type="detail" />
}
