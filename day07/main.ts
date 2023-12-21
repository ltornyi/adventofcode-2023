const CARDS = {
  'A':12,
  'K':11,
  'Q':10,
  'J':9,
  'T':8,
  '9':7,
  '8':6,
  '7':5,
  '6':4,
  '5':3,
  '4':2,
  '3':1,
  '2':0
}

const CARDS_W_JOKER = {
  'A':12,
  'K':11,
  'Q':10,
  'T':9,
  '9':8,
  '8':7,
  '7':6,
  '6':5,
  '5':4,
  '4':3,
  '3':2,
  '2':1,
  'J':0,
}

type Card = keyof typeof CARDS;

export type CardCount = Map<Card, number>;

const HAND_TYPES = {
  '5':7,
  '1+4':6,
  '2+3':5,
  '1+1+3':4,
  '1+2+2':3,
  '1+1+1+2':2,
  '1+1+1+1+1':1
}

type HandType = keyof typeof HAND_TYPES

export type Hand = {
  cards: string,
  type: HandType,
  bid: number,
  cardCount: CardCount
}

export const answerPart1 = (input:string[]): number => {
  const hands: Hand[] = parseInput(input);
  hands.sort((a,b) => compareHands(a,b))
  return hands.reduce((prev, curr, index) => prev + (index+1) * curr.bid, 0);
}

const parseInput = (input:string[], withJokerRule: boolean = false): Hand[] => input.map(line => parseLine(line, withJokerRule));

const parseLine = (line:string, withJokerRule: boolean = false): Hand => {
  const [cards, bid] = line.split(' ');
  const cardCount = getCardCount(cards, withJokerRule);
  const handType = getHandType(cardCount);
  return {
    cards,
    type: handType,
    bid: parseInt(bid),
    cardCount
  }
}

export const getCardCount = (cards: string, withJokerRule: boolean = false): CardCount => {
  const result: CardCount = new Map();
  cards.split('').forEach(card => {
    result.set(card as Card, (result.get(card as Card) || 0) + 1)
  });
  //with the Joker rule if we have at least 1 Joker but not all five:
  if (withJokerRule && result.has('J') && result.get('J') !== 5) {
    //J increases the largest value by number of Js
    const numJokers = result.get('J') || 0;
    result.delete('J');
    let maxVal = 0;
    let maxCard;
    for (const [card, val] of result.entries()) {
      if (val > maxVal) {
        maxVal = val;
        maxCard = card;
      }
    }
    result.set(maxCard as Card, maxVal + numJokers)
  }
  return result;
}

export const getHandType = (cardCount: CardCount): HandType => {
  //5, 1+4, 2+3, 1+1+3, 1+2+2, 1+1+1+2, 1+1+1+1+1
  const vals = [...cardCount.values()].sort((a,b) => a-b).join('+')
  return vals as HandType;
}

const compareHands = (a: Hand, b: Hand, withJokerRule: boolean = false): number => {
  if (a.type !== b.type) {
    return HAND_TYPES[a.type] - HAND_TYPES[b.type]
  } else {
    const cardValues = withJokerRule ? CARDS_W_JOKER : CARDS
    for (let i=0; i< a.cards.length; i++) {
      if (a.cards[i] !== b.cards[i]) {
        return cardValues[a.cards[i] as Card] - cardValues[b.cards[i] as Card]
      }
    }
  }
  return 0;
}

export const answerPart2 = (input:string[]): number => {
  const hands: Hand[] = parseInput(input, true);
  hands.sort((a,b) => compareHands(a,b,true))
  return hands.reduce((prev, curr, index) => prev + (index+1) * curr.bid, 0);
}