import { MARVEL_CHAMPIONS_CARDS } from '../cards'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const cardId = params.id
  const card = MARVEL_CHAMPIONS_CARDS.find(({ id }) => id === cardId)

  return Response.json(card)
}
