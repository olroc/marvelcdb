export const getImageUrl = (id: string) =>
  `/img/cards/01${id.padStart(id.match(/[A-Z]/) ? 4 : 3, '0')}.png`
