const path = require('path');
const pinFileToIPFS = require('./pinFilesToIPFS');

const filePath = path.join(__dirname, '../assets/panda.jpeg');
// const filePath = path.join(__dirname, '../data/metadata.json');

pinFileToIPFS(filePath);