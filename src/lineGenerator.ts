import words from './words.json';

enum WordMod {
  NONE,
  PRE,
  POST,
  BOTH,
  PARENS,
}

const mods = [
  WordMod.NONE,
  WordMod.PRE,
  WordMod.POST,
  WordMod.BOTH,
  WordMod.PARENS,
];
const pre = ['~', '@', '#', '$', '%', '^', '*', '\\', '/'];
const post = [',', '.', ';', ':', '=', '!', '?', '|'];
const parens = ["''", '""', '``', '<>', '()', '{}', '[]'];

enum WordCase {
  NONE,
  CAPITAL,
  CAMEL,
  SNAKE,
  PASCAL,
}

const cases = [
  WordCase.NONE,
  WordCase.CAPITAL,
  WordCase.CAMEL,
  WordCase.SNAKE,
  WordCase.PASCAL,
];

class LineGenerator {
  width: number;

  constructor(width: number) {
    this.width = width;
  }

  public getLine(): string {
    let result = '';
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const word = this.getWord();
      if (result.length + word.length + 1 < this.width) {
        if (result) result += ' ';
        result += word;
      } else break;
    }
    return result;
  }

  private getWord(): string {
    let word = this.getRandomElement(words);
    word = this.applyCase(word);
    word = this.applyMod(word);

    return word;
  }

  private applyCase(word: string): string {
    switch (this.getRandomElement(cases)) {
      case WordCase.CAPITAL:
        return word[0].toUpperCase() + word.slice(1);
      case WordCase.CAMEL: {
        const i = this.getRandomIndex(word);
        return word.slice(0, i) + word[i].toUpperCase() + word.slice(i + 1);
      }
      case WordCase.PASCAL: {
        word = word[0].toUpperCase() + word.slice(1);
        const i = this.getRandomIndex(word);
        return word.slice(0, i) + word[i].toUpperCase() + word.slice(i + 1);
      }
      case WordCase.SNAKE: {
        const i = this.getRandomIndex(word);
        return word.slice(0, i) + '_' + word.slice(i);
      }
    }
    return word;
  }

  private applyMod(word: string): string {
    const mod = this.getRandomElement(mods);
    switch (mod) {
      case WordMod.PARENS: {
        const paren = this.getRandomElement(parens);
        return paren[0] + word + paren[1];
      }
      case WordMod.PRE: {
        const p = this.getRandomElement(pre);
        return p + word;
      }
      case WordMod.POST: {
        const p = this.getRandomElement(post);
        return word + p;
      }
      case WordMod.BOTH: {
        const p1 = this.getRandomElement(pre);
        const p2 = this.getRandomElement(post);
        return p1 + word + p2;
      }
    }
    return word;
  }

  private getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  private getRandomIndex(word: string): number {
    return Math.floor(Math.random() * word.length);
  }
}

export default LineGenerator;
