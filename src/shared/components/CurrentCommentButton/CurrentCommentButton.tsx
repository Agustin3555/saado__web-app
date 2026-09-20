import './CurrentCommentButton.css'
import { Button, Dropdown, Icon } from '..'

interface CurrentCommentButtonProps {
  comment: string
}

export const CurrentCommentButton = ({
  comment,
}: CurrentCommentButtonProps) => {
  return (
    <Dropdown
      opener={attrs => (
        <Button
          handlingClass="cmp-current-comment-button"
          title="Ver comentario"
          iconClass="ti ti-message"
          size="s"
          htmlAttrs={attrs}
        />
      )}
    >
      <Icon iconClass="ti ti-quote" />
      <p className="text">{comment}</p>
    </Dropdown>
  )
}
