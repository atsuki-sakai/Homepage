
import { useId } from 'react'
import clsx from 'clsx'
import React from 'react'

export function Logomark({
  invert = false,
  filled = false,
  fillOnHover = false,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & { 
  invert?: boolean; 
  filled?: boolean;
  fillOnHover?: boolean;
}) {
  const id = useId()

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={clsx(fillOnHover && 'group/logo', props.className)} {...props}>
      <style>
        {`
          .logo-tilt {
            transition: transform 0.4s ease-in-out;
            transform-origin: 16px 16px;
          }
          .group\\/logo:hover .logo-tilt {
            transform: rotate(-8deg) scale(1.05);
          }
        `}
      </style>
      
      <g className="logo-tilt">
        <rect
          x="0"
          y="0"
          mask={`url(#${id}-mask)`}
          className={clsx(
            'h-8 transition-all duration-500',
            invert ? 'fill-white' : 'fill-neutral-950',
            filled ? 'w-8' : 'w-0 group-hover/logo:w-8',
          )}
        />
        <use
          href={`#${id}-k-path`}
          className={invert ? 'stroke-white' : 'stroke-neutral-950'}
          fill="none"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>
      
      <defs>
        <path
          id={`${id}-k-path`}
          d="M 8 8 
             Q 8 12 8 16
             Q 8 20 8 24
             M 8 16
             Q 12 12 16 10
             Q 20 8 24 8
             M 8 16  
             Q 12 20 16 22
             Q 20 24 24 24"
        />
        <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
          <rect x="0" y="0" width="32" height="32" fill="black" />
          <use href={`#${id}-k-path`} stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </mask>
      </defs>
    </svg>
  )
}


export function Logo({
  className,
  invert = false,
  filled = false,
  fillOnHover = false,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & {
  invert?: boolean
  filled?: boolean
  fillOnHover?: boolean
}) {
  return (
    <svg
      viewBox="0 0 130 32"
      aria-hidden="true"
      className={clsx(fillOnHover && 'group/logo logo-group', className)}
      {...props}
    >
      <style>
        {`
          .text-outline {
            transition: fill 0.8s ease-in-out, stroke-width 0.4s ease-in-out, fill-opacity 0.8s ease-in-out;
            fill: #0f0f23;
            fill-opacity: 0;
            stroke: #0f0f23;
            stroke-width: 1;
          }
          .text-outline.text-invert {
            fill: white;
            stroke: white;
          }
          .logo-group:hover .text-outline {
            fill-opacity: 1;
            stroke-width: 0;
          }
          .logo-group:hover .text-outline.text-invert {
            fill-opacity: 1;
            stroke-width: 0;
          }
        `}
      </style>
      
      <Logomark
        preserveAspectRatio="xMinYMid meet"
        invert={invert}
        filled={filled}
      />
      <text
        x={40}
        y={22}
        className={clsx('text-outline', invert && 'text-invert')}
        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial"
        fontWeight={700}
        fontSize={16}
        letterSpacing=".02em"
      >
        KONDAX
      </text>
    </svg>
  )
}
