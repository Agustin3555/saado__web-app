import './EmailChip.css'
import { Chip, type ChipProps } from '@/shared/components'

interface EmailChip extends Pick<ChipProps, 'type'> {
  email?: string | null
}

export const EmailChip = ({ email, type }: EmailChip) => {
  if (!email) return null

  return (
    <Chip
      handlingClass="cmp-email-chip"
      label="Email"
      value={email}
      iconClass="ti ti-mail"
      {...{ type }}
    >
      <a href={`mailto:${email}`}>{email}</a>
    </Chip>
  )
}
