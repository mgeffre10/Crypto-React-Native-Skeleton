const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledContract = require('../ethereum/build/TestContract.json');

let accounts;
let testContract;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    testContract = await new web3.eth.Contract(compiledContract.abi)
        .deploy({ data: compiledContract.evm.bytecode.object, arguments: ['Test'] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('TestContract', () => {
    it('should deploy contract', async() => {
        assert.ok(testContract.options.address);
    });
})