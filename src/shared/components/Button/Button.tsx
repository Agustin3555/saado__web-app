import './Button.css'
import { type ButtonHTMLAttributes, type MouseEventHandler } from 'react'
import type { ActionState } from '@/shared/hooks/useActionState'
import { Icon } from '../Icon/Icon'
import { Loader } from '../Loader/Loader'
import { classList } from '@/shared/helpers'

export interface ButtonProps {
  handlingClass?: string
  name?: string
  text?: string
  title?: string
  iconClass?: string
  type?: 'primary' | 'secondary'
  size?: 's' | 'm' | 'l'
  filled?: boolean
  inverted?: boolean
  wrap?: boolean
  keepBody?: boolean
  submit?: boolean
  actionState?: ActionState
  onAction?: MouseEventHandler<HTMLButtonElement>
  htmlAttrs?: ButtonHTMLAttributes<HTMLButtonElement>
}

export const Button = ({
  handlingClass,
  name,
  text,
  title,
  iconClass,
  type = 'secondary',
  size = 'm',
  filled = false,
  inverted = false,
  wrap = false,
  keepBody = false,
  submit = false,
  actionState,
  onAction,
  htmlAttrs,
}: ButtonProps) => {
  const square = iconClass !== undefined && text === undefined

  return (
    <button
      className={classList('cmp-button', `ui-${size}`, type, handlingClass, {
        square,
        filled,
        inverted,
        wrap,
        keepBody,
      })}
      title={title ?? text}
      type={submit ? 'submit' : 'button'}
      disabled={actionState ? actionState !== 'ready' : false}
      onClick={onAction}
      {...{ name, ...htmlAttrs }}
    >
      <div
        className={classList('body', 'item', 'text', {
          onScreen: !keepBody && actionState ? actionState === 'ready' : true,
        })}
      >
        {text}
        {iconClass && <Icon {...{ iconClass }} />}
      </div>
      {actionState && (
        <div className="status-group">
          <div
            className={classList('loading', 'item', {
              onScreen: actionState === 'loading',
            })}
          >
            <Loader />
          </div>
          <Icon
            iconClass="fa-solid fa-xmark"
            handlingClass={classList('item', {
              onScreen: actionState === 'error',
            })}
          />
          <Icon
            iconClass="fa-solid fa-check"
            handlingClass={classList('item', {
              onScreen: actionState === 'success',
            })}
          />
        </div>
      )}
    </button>
  )
}
