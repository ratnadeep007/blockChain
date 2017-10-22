const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, prevHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.calcualteHash();
        this.nonce = 0;
    }

    calcualteHash(){
        //return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString();
        return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) != Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calcualteHash();
        }

        console.log("Block mined:" + this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2017", "Gensis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.prevHash = this.getLatestBlock().hash;
        //newBlock.hash = newBlock.calcualteHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isthisValid(){
        for(let i=1; i<=this.chain.length; i++){
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i-1];

            if(currentBlock.hash != currentBlock.calcualteHash()){
                return false;
            }

            if(currentBlock.prevHash != prevBlock.hash){
                return true;
            }

            return true;
        }
    }
}

let coin = new Blockchain();
console.log("Mining block...");
coin.addBlock(new Block(1, "10/07/2017", {amount: 4}));
console.log("Mining block...");
coin.addBlock(new Block(2, "20/07/2017", {amount: 10}));

//console.log("Is Blockchain valid:" + coin.isthisValid());

//coin.chain[1].data = {amount: 100};
//coin.chain[1].data = coin.chain[1].calcualteHash();

//console.log("Is Blockchain valid:" + coin.isthisValid());

console.log(JSON.stringify(coin, null, 4));
