import { z } from 'zod'
import data from '../data.json'

export async function GET(
  _: Request,
  { params }: { params: { slug: string } },
) {
  await new Promise((resolve) => setTimeout(resolve, 2000)) // delay to better simulate a real usage scenario (can delete for prod)

  const slug = z.string().parse(params.slug)

  const product = data.products.find((product) => product.slug === slug)

  return product
    ? Response.json(product)
    : Response.json({ message: 'Produto não encontrado' }, { status: 400 })
}
