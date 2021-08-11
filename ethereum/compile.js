const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const CONTRACT_NAME = 'TestContract.sol';

const contractPath = path.resolve(__dirname, 'contracts', CONTRACT_NAME);
const source = fs.readFileSync(contractPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        [CONTRACT_NAME]: {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

const rawOutput = solc.compile(JSON.stringify(input));
const output = JSON.parse(rawOutput).contracts;

fs.ensureDirSync(buildPath);

for (const contract in output) {
    const contractName = contract.replace('.sol', '');
    fs.outputJSONSync(path.resolve(buildPath, `${contractName}.json`), output[contract][contractName]);
}