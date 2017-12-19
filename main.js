const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + JSON.stringify(this.data)).toString();

    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "19/12/2017", "Genesis Block", "0");
    }

    getLetestBlock(){
        return this.chain[this.chain.length - 1];
    };

    addBlock(newBlock){
        newBlock.previousHash = this.getLetestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
                console.log("Erro verificar transação!!")
            }
            if (currentBlock.previousHash !== previousBlock.hash){
                return false;
                console.log("Erro verificar transação!!")
            }   
        }

        return true;
        console.log(" Inserido com Sucesso !!")
    }

}

let mobileCoin = new Blockchain();
mobileCoin.addBlock(new Block(1, "19/12/2017", { amount: 53}))
mobileCoin.addBlock(new Block(1, "19/12/2017", { amount: 52}))

console.log(JSON.stringify(mobileCoin, null, 4))