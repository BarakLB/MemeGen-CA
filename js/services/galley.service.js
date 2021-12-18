'use strict';
var gImgs;
var gImgId = 0;
var gMap;


//IMAGES CREATION
function createImages() {
  gImgs = [];
  gImgs.push(_createImg(['Trump', 'Politics', 'Shocked']));
  gImgs.push(_createImg(['Puppies', 'Animals']));
  gImgs.push(_createImg(['Puppies', 'Baby', 'Funny']));
  gImgs.push(_createImg(['Cat', 'Animals']));
  gImgs.push(_createImg(['Baby', 'Funny']));
  gImgs.push(_createImg(['Ugly']));
  gImgs.push(_createImg(['Baby', 'Shocked', 'Funny']));
  gImgs.push(_createImg(['Listening', 'Funny']));
  gImgs.push(_createImg(['Baby', 'Evil']));
  gImgs.push(_createImg(['Obama', 'Funny', 'Politics']));
  gImgs.push(_createImg(['Fight', 'NBA']));
  gImgs.push(_createImg(['Busted', 'Celeb']));
  gImgs.push(_createImg(['Cheers', 'Celeb']));
  gImgs.push(_createImg(['Shocked', 'Movie']));
  gImgs.push(_createImg(['Busted']));
  gImgs.push(_createImg(['Funny', 'Movie']));
  gImgs.push(_createImg(['Politics']));
  gImgs.push(_createImg(['Movie']));
}

function _createImg(keywords) {
  return { id: gImgId++, url: `img/SQUARE/${gImgId}.jpg`, keywords };
}

//FILTER & UPLOAD SECTION FUNCS
function renderOptions() {
  var strHTML = '';
  var keysMap = getKeysMap();
  var keys = Object.keys(keysMap)
  keys.forEach(key => {
    strHTML += `
    <option value="${key}">
    `
  })
  strHTML += `
  <option value="ALL"></option>
  `
  document.querySelector('#keys').innerHTML = strHTML
}

function getKeysMap() {
  var imgs = getgImgs()
  var keys = [];
  imgs.map((img,) => {
    img.keywords.forEach((key) => {
      keys.push(key)
    })
  })
  var keysMap = getWordCount(keys)
  gMap = keysMap

  return gMap
}

function getWordCount(array) {
  let map = {};
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    map[item] = (map[item] + 1) || 1;
  }
  return map;
}

function addImg(img) {
  gImgs.unshift({ id: gImgId++, url: img.src, keywords: [] });
}


function renderSearchBar(map=getKeysMap()) {
  var keys = Object.keys(map)
  var values = Object.values(map)
  var strHTML = ''

  for (var i = 0; i < values.length; i++) {
    if (values[i] >= 2)
      strHTML += `
  <button class="search-bar-btn" onclick="onFilter(this.value)" value="${keys[i]}"  style="font-size:${(values[i] * 7)}px">${keys[i]}</button>
  `
  }
  strHTML += `
  <button class="search-bar-btn all-btn" style="font-size:50px" onclick="onFilter(this.value)" value="ALL">ALL</button>
  `
  document.querySelector('.search-bar').innerHTML = strHTML
}


//GET
function getgImgs() {
  return gImgs;
}
