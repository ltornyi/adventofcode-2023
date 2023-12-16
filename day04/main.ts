export type Card = {
  index: number,
  winningNumbers: number[],
  yourNumbers: number[]
}

export const answerPart1 = (input:string[]): number => {
  let result = 0;
  for (const line of input) {
    const card = parseCardLine(line);
    result += cardValue(card);
  }
  return result;
}

export const parseCardLine = (line: string): Card => {
  const [card,numbers] = line.split(':');
  const index = parseInt(card.trim().split(' ')[1])
  const [winning, your] = numbers.trim().split('|').map(s => s.trim())
  const winningNumbers = winning.split(' ').filter(s => s !== '').map(s => parseInt(s))
  const yourNumbers = your.split(' ').filter(s => s !== '').map(s => parseInt(s))
  return {index, winningNumbers, yourNumbers}
}

export const numberOfWins = (card: Card): number => {
  return card.yourNumbers.filter(n => card.winningNumbers.includes(n)).length
}

export const cardValue = (card: Card): number => {
  const nw = numberOfWins(card);
  return nw == 0 ? 0 : 2 ** (nw - 1)
}

export type CardSlot = {
  card: Card,
  copies: number
}

export const answerPart2 = (input:string[]): number => {
  const cardPile = buildCardPile(input);

  addBonusCards(cardPile);
  
  return countCardsInPile(cardPile);
}

export const buildCardPile = (input:string[]): CardSlot[] => {
  const cardPile: CardSlot[] = [];
  for (const line of input) {
    const card = parseCardLine(line);
    cardPile.push({card, copies:1})
  }
  return cardPile;
}

export const addBonusCards = (cardPile: CardSlot[]) => {
  for (const [index, slot] of cardPile.entries()) {
    const wins = numberOfWins(slot.card);
    for (let i=0; i<wins; i++) {
      if (index + i + 1 < cardPile.length) {
        cardPile[index + i + 1].copies += slot.copies;
      }
    }
  }
}

export const countCardsInPile = (pile: CardSlot[]): number => {
  return pile.map(c => c.copies).reduce((prev, curr) => prev + curr, 0)
}