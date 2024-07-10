import data from '../data.json'

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 2000)) // delay to better simulate a real usage scenario (can delete for prod)

  const featuredProducts = data.products.filter((product) => product.featured)

  return Response.json(featuredProducts)
}
