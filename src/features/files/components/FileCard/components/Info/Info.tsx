import './Info.css'
import { UserActivityChip } from '@/features/users/UserActivityChip/UserActivityChip'
import { NumberVerdictTypesChip } from '@/features/controls/components/NumberVerdictTypesChip/NumberVerdictTypesChip'
import { VERDICT_MATCH } from '@/features/files/file.const'
import type { File, VerdictType } from '@/features/files/file.types'
import { Icon } from '@/shared/components'

interface InfoProps {
  data: Pick<File, 'createdAt' | 'updatedAt' | 'fileControls'>
}

export const Info = ({
  data: { createdAt, updatedAt, fileControls },
}: InfoProps) => {
  return (
    <div className="cmp-info">
      <div className="controls">
        <NumberVerdictTypesChip amount={fileControls.length} />
        <Icon iconClass="ti ti-arrow-narrow-right" />
        <ul>
          {Object.keys(VERDICT_MATCH).map(verdict => {
            const amount = fileControls.filter(
              c => c.verdict === verdict,
            ).length
            if (amount === 0) return null

            return (
              <NumberVerdictTypesChip
                key={verdict}
                verdict={verdict as VerdictType}
                {...{ amount }}
              />
            )
          })}
        </ul>
      </div>
      <ul className="info">
        <UserActivityChip
          dateTime={updatedAt}
          activity="updated"
          type="detail"
        />
        <UserActivityChip dateTime={createdAt} type="detail" />
      </ul>
    </div>
  )
}
