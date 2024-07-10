import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={twMerge('gg-zinc-50/10 animate-pulse rounded-md', className)} // aqui utilizamos o pacote 'tailwind-merge' para unir quaisquer propriedades de className vindas de props
      {...props}
    ></div>
  )
}
