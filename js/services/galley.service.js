'use strict';
var gImgs;
var gImgId = 0;

function createImages() {
  gImgs = [];
  gImgs.push(_createImg(['Trump', 'Politics', 'President']));
  gImgs.push(_createImg(['Puppies', 'Animals']));
  gImgs.push(_createImg(['Puppies', 'Baby', 'Funny']));
  gImgs.push(_createImg(['Cat', 'Animals']));
  gImgs.push(_createImg(['Baby', 'Funny']));
  gImgs.push(_createImg(['Ugly']));
  gImgs.push(_createImg(['Baby', 'Shocked']));
  gImgs.push(_createImg(['Listening', 'Funny']));
  gImgs.push(_createImg(['Baby', 'Evil']));
  gImgs.push(_createImg(['Obama', 'Funny', 'Politics', 'President']));
  gImgs.push(_createImg(['Fight', 'NBA']));
  gImgs.push(_createImg(['Busted', 'Celeb']));
  gImgs.push(_createImg(['Cheers', 'Celeb']));
  gImgs.push(_createImg(['Shocked', 'Movie']));
  gImgs.push(_createImg(['Busted']));
  gImgs.push(_createImg(['Funny', 'Movie']));
  gImgs.push(_createImg(['Politics', 'President']));
  gImgs.push(_createImg(['Movie']));
  // getKeyWords()
  renderOptions()
}

function renderOptions(){
  var strHTML = '';
  var keysMap = getKeyWords();
  var keys = Object.keys(keysMap)
  console.log('keys:', keys);
  keys.forEach(key => {
    strHTML += `
    <option value="${key}">
    `
  })
  console.log('strHTML:', strHTML);
  strHTML += `
  <option value="ALL"></option>
  `
  console.log('document.querySelector(#keys):', document.querySelector('#keys'));
  
  
  document.querySelector('#keys').innerHTML = strHTML
}

function getKeyWords(){
  var imgs = getgImgs()
  var keys = [];
  imgs.map((img,) => {
    img.keywords.forEach((key)=> {
      keys.push(key)
    })
  })
 var keysMap = getWordCount(keys)
return keysMap
}

function getWordCount(array) {
  let map = {};
for (let i = 0; i < array.length; i++) {
    let item = array[i];
    map[item] = (map[item] + 1) || 1;
  }
  // console.log('map:', map);
  
  return map;
}

function addImg(img) {
  gImgs.unshift({ id: gImgId++, url: img.src, keywords: [] });
}

function _createImg(keywords) {
  return { id: gImgId++, url: `img/SQUARE/${gImgId}.jpg`, keywords };
}

function getgImgs() {
  return gImgs;
}
