import path from 'path';

const dicPath = '/dict';

export class Kuromoji {
  constructor() {
    this.tokenizer = undefined;
  }

  init() {
    if (this.tokenizer) {
      return Promise.resolve(this.tokenizer);
    }

    try {
      const kuromoji = require('kuromoji');
      return new Promise((resolve, reject) => {
        return kuromoji.builder({ dicPath }).build((error, tokenizer) => {
          if (error) {
            return reject(error);
          }
          this.tokenizer = tokenizer;
          return resolve(tokenizer);
        });
      });
    } catch (error) {
      return Promise.resolve(error);
    }
  }
}

const kuromoji = new Kuromoji();
export default kuromoji;
