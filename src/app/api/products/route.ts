import data from '../products/data.json'

export async function GET() {
  return Response.json(data.products)
}
