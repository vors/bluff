const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};

export function getShuffledDeck(): string[] {
    const deck = [
        "2♣",
        "3♣",
        "4♣",
        "5♣",
        "6♣",
        "7♣",
        "8♣",
        "9♣",
        "10♣",
        "J♣",
        "Q♣",
        "K♣",
        "A♣",
        "2♠",
        "3♠",
        "4♠",
        "5♠",
        "6♠",
        "7♠",
        "8♠",
        "9♠",
        "10♠",
        "J♠",
        "Q♠",
        "K♠",
        "A♠",
        "2♥",
        "3♥",
        "4♥",
        "5♥",
        "6♥",
        "7♥",
        "8♥",
        "9♥",
        "10♥",
        "J♥",
        "Q♥",
        "K♥",
        "A♥",
        "2♦",
        "3♦",
        "4♦",
        "5♦",
        "6♦",
        "7♦",
        "8♦",
        "9♦",
        "10♦",
        "J♦",
        "Q♦",
        "K♦",
        "A♦",
    ];
    shuffleArray(deck);
    return deck;
}
