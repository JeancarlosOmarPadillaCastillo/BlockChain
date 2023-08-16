import pkg from 'crypto-js';
const { SHA256 } = pkg;

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, '01/01/2023', 'Genesis Block', '0');
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  printChain() {
    console.log(JSON.stringify(this.chain, null, 2));
  }
}

// Crear una instancia de la cadena de bloques
const myBlockchain = new Blockchain();

// Agregar bloques a la cadena
myBlockchain.addBlock(new Block(1, '08/14/2023', { amount: 100 }));
myBlockchain.addBlock(new Block(2, '08/15/2023', { amount: 50 }));
myBlockchain.addBlock(new Block(3, '08/16/2023', { amount: 200 }));
myBlockchain.addBlock(new Block(4, '08/17/2023', { amount: 75 }));
myBlockchain.addBlock(new Block(5, '08/18/2023', { amount: 300 }));

// Mostrar la cadena de bloques por consola
myBlockchain.printChain();
