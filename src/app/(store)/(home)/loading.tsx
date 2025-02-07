import { Skeleton } from '@/components/skeleton'

export default function HomeLoading() {
  return (
    // <h1>Carregando...</h1>
    <div className="grid h-full grid-cols-9 grid-rows-6 gap-6">
      <Skeleton className="col-span-6 row-span-6 h-[850px]" />
      <Skeleton className="col-span-3 row-span-3" />
      <Skeleton className="col-span-3 row-span-3" />
    </div>
  )
}
