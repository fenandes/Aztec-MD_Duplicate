const axios = require('axios');
const fs = require('fs');
const path = require('path');
const config = require('../config');

let json = {};

function loadLanguage() {
  return new Promise((resolve, reject) => {
    let langFile = './mangoes/connection/Images/' + config.LANG + '.json';

    fs.readFile(langFile, 'utf8', (err, data) => {
      if (err) {
        fs.readFile('./mangoes/connection/Images/VO_TERX.json', 'utf8', (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(data));
          }
        });
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

function getString(file) {
  return json['STRINGS'][file];
}

function displayMessage(message) {
  console.log('Message:', message);
}

async function Decent() {
  try {
    const jsonData = await loadLanguage();
    json = jsonData;
    let LangG = getString('Config');
    displayMessage('Loading ' + config.LANG + ' language...');
  } catch (error) {
    console.error('Failed to load language:', error);
  }
}

Decent();

function cou_ntry() {
  let LangG = getString('Config');
  return LangG;
}

function aztec_images() {
  return new Promise((resolve, reject) => {
    let LangG = getString('Config');
    if (!LangG) {
      reject(new Error('Language not loaded'));
      return;
    }
    let max_up = [
      `${LangG.image1}`,
      `${LangG.image2}`,
      `${LangG.image3}`,
      `${LangG.image4}`,
      `${LangG.image5}`,
      `${LangG.image6}`,
      `${LangG.image7}`,
      `${LangG.image8}`,
      `${LangG.image9}`,
      `${LangG.image9}`,
      `${LangG.image10}`
    ];
    const image_vorterx = max_up[Math.floor(Math.random() * max_up.length)];
    resolve(image_vorterx);
  });
}

async function displayAztecPicture() {
  try {
    let AztecPicture = await aztec_images();
    console.log('Aztec Picture:', AztecPicture);
  } catch (error) {
    console.error('Failed to fetch the picture for Aztec:', error);
  }
}

displayAztecPicture();

module.exports = {
  cou_ntry,
  aztec_images,
  language: json,
  getString: getString
};
