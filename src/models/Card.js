export default class Card {
  static Suits = Object.freeze([
    'clubs',
    'diamonds',
    'spades',
    'hearts'
  ]);

  static Ranks = Object.freeze([
    ['two', 2],
    ['three', 3],
    ['four', 4],
    ['five', 5],
    ['six', 6],
    ['seven', 7],
    ['eight', 8],
    ['nine', 9],
    ['ten', 10],
    ['jack', 10],
    ['queen', 10],
    ['king', 10],
    ['ace', 11],
  ]);

  constructor(suit, rank) {
    if (!Card.Suits.includes(suit)) {
      throw new TypeError(`Could not initialise \`Card\` with suit "${JSON.stringify(suit)}"`);
    }

    if (!Card.Ranks.includes(rank)) {
      throw new TypeError(`Could not initialise \`Card\` with rank "${JSON.stringify(rank)}"`);
    }

    Object.defineProperties(this, {
      suit: {
        value: suit,
        enumerable: false,
      },
      rank: {
        value: rank,
        enumerable: false,
      },
    });
  }

  getRankName() {
    return this.rank[0]
  }

  getValue() {
    return this.rank[1];
  }

  getSuit() {
    return this.suit;
  }

  toString() {
    return `${this.rank[0]}-of-${this.suit}`;
  }
}