
const fs = require('fs');
const axios = require('axios');
const secret = require('../secret.json');
const FormData = require('form-data');
const path = require('path');

// Calls Pinata API's to pin file to IPFS
const pinFileToIPFS = async (filePath) => {
  const pinataEndpoint =secret.PINATA_ENDPOINT;
  const pinataApiKey = secret.PINATA_API_KEY;
  const pinataApiSecret = secret.PINATA_API_SECRET;
  const form_data = new FormData();
  try {
    form_data.append('file', fs.createReadStream(filePath));
    const request = {
      method: 'post',
      url: pinataEndpoint,
      maxContentLength: 'Infinity',
      headers: {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataApiSecret,
        'Content-Type': `multipart/form-data; boundary=${form_data._boundary}`,
      },
      data: form_data,
    };
    console.log('request:', request);
    const response = await axios(request);
    console.log('Successfully pinned file to IPFS : ', response);
    await storeDataToFile(response.data);
    console.log('Successfully added IPFS response to json file');
  } catch (err) {
    console.log('Error occurred while pinning file to IPFS: ', err);
  }
};

const storeDataToFile = async (jsonData) => {
  try {
    const filePath = path.join(__dirname, '../data/metadata.sol');
    const ipfsFileExists = await fileExists(filePath);
    if (!ipfsFileExists) {
      console.log('ipfsFileExists: ', ipfsFileExists);
      // First time creating an empty file with [].
      // We will be storing all ipfsHashes as array of objects
      await fs.writeFile(filePath, JSON.stringify([]));
    }
    const data = await fs.readFile(filePath, 'utf8');
    const json = JSON.parse(data);
    json.push(jsonData);
    await fs.writeFile(filePath, JSON.stringify(json));
  } catch (err) {
    console.log('Error occured while storing data to file', err);
  }
};

async function fileExists(path) {
  try {
    const res = await fs.access(path);
    return true;
  } catch (err) {
    // no such file or directory. File really does not exist
    if (err.code == 'ENOENT') {
      return false;
    }
    console.log('Exception fs.statSync (' + path + '): ' + err);
    // some other exception occurred
    throw err;
  }
}

module.exports = pinFileToIPFS;