import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

/**
 * Cache e Memoization
 *
 * Memoization (react): A mesma requisição com os mesmos parâmetros é impedida de ser feita repetidas vezes
 * (isso ja acontece por padrão em server components por parte do React)
 *
 * Cache (next): Dados armazenados de requisições ja feitas independente da página em questão (diferente do memoization)
 */

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api('/products/featured', {
    // cache: 'force-cache', // force-cache é o comportamento padrão da api (apenas no next?), no-store significa não cachear
    next: {
      revalidate: 60 * 60, // 1 hour
      // nessa opção (apenas para o next) todos os usuários que fizerem esta requisição vão receber os
      // mesmos dados pelo tempo determinado em segundos
    },
  })

  const products = await response.json()

  return products
}

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts()

  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/product/${highlightedProduct.slug}`}
        className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
      >
        <Image
          src={highlightedProduct.image}
          className="group-hover:scale-110 transition-transform duration-300"
          width={920}
          height={920}
          quality={100}
          alt=""
        />

        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highlightedProduct.title}</span>
          <span className="flex h-full items-center justify-center  rounded-full bg-violet-500 px-4 font-semibold">
            {highlightedProduct.price.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'brl',
              currencyDisplay: 'symbol',
              maximumFractionDigits: 0,
              notation: 'compact',
            })}
          </span>
        </div>
      </Link>

      {otherProducts.map((produto) => (
        <Link
          key={produto.id}
          href={`/product/${produto.slug}`}
          className="group relative col-span-3 row-span-3  rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
        >
          <Image
            src={produto.image}
            className="group-hover:scale-110 transition-transform duration-300"
            width={920}
            height={920}
            quality={100}
            alt=""
          />
          <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="text-sm truncate">{produto.title}</span>
            <span className="flex h-full items-center justify-center  rounded-full bg-violet-500 px-4 font-semibold">
              {produto.price.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'brl',
                currencyDisplay: 'symbol',
                maximumFractionDigits: 0,
                notation: 'compact',
              })}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
