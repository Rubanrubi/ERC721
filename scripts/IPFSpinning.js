
const fs = require('fs');
const axios = require('axios');
const secret = require('../secret.json');
const FormData = require('form-data');
const { storeDataToFile } = require('./ipfsHelper.js');

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

const filePath = path.join(__dirname, '../assets/octo.gif');
// const filePath = path.join(__dirname, '../data/metadata.json');

pinFileToIPFS(filePath);