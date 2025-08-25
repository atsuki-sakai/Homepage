import clsx from 'clsx'

export function TagList({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <ul role="list" className={clsx(className, 'flex flex-wrap gap-4')}>
      {children}
    </ul>
  )
}

export function TagListItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <li
      className={clsx(
        'rounded-full bg-gradient-to-r from-black to-slate-800 px-5 py-2.5 font-semibold text-sm text-white shadow-sm ring-1 ring-neutral-200/50',
        className,
      )}
    >
      <span className="flex items-center gap-2 text-xs">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400"></span>
        {children}
      </span>
    </li>
  )
}
