import './Tabs.css'
import { useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { Icon } from '..'

export interface TabsProps {
  panels: { label: string; iconClass: string; component: ReactNode }[]
}

export const Tabs = ({ panels }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const labelsRef = useRef<(HTMLLabelElement | null)[]>([])
  const id = useId()

  useLayoutEffect(() => {
    const activeLabel = labelsRef.current[activeIndex]
    if (!activeLabel) return

    setIndicatorStyle({
      left: activeLabel.offsetLeft,
      width: activeLabel.offsetWidth,
    })
  }, [activeIndex])

  return (
    <div className="cmp-tabs">
      <div className="tab-list ui-s">
        {panels.map(({ label, iconClass }, i) => (
          <label
            key={label}
            ref={element => {
              labelsRef.current[i] = element
            }}
          >
            <input
              name={id}
              type="radio"
              hidden
              checked={i === activeIndex}
              onChange={() => setActiveIndex(i)}
            />
            <Icon {...{ iconClass }} />
            {label}
          </label>
        ))}
        <span className="indicator" style={indicatorStyle} />
      </div>
      {panels[activeIndex].component}
    </div>
  )
}
