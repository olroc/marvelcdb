import { MARVEL_CHAMPIONS_CARDS } from './cards'

export async function GET() {
  return Response.json(MARVEL_CHAMPIONS_CARDS)
}
