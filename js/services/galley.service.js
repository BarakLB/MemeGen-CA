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
  gImgs.push(_createImg(['Listening, Funny']));
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
}

function _createImg(keywords) {
  return { id: gImgId++, url: `img/SQUARE/${gImgId}.jpg`, keywords };
}

function getgImgs() {
  return gImgs;
}
