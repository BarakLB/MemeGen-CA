'use strict';

//MAIN-GALL
function renderImgs(imgs = getgImgs()) {
  var strHTML = '';
  imgs.forEach((img, idx) => {
    strHTML += `<img class="gallery-img" data-id="${idx}" src="${img.url}" alt="" onclick="onImgSelect(this)">`;
  });
  document.querySelector('.imgs-container').innerHTML = strHTML;
}


function openGallery() {
  document.querySelector('.editor-container').classList.add('hide');
  document.querySelector('.saved-container').classList.add('hide');
  document.querySelector('.about-me').classList.add('hide');
  document.querySelector('.imgs-container').classList.remove('hide');
  gLineId = 0;
  gMeme = null;
  document.querySelector('.text-line').value = '';
}

//SAVED-GALL
function renderSavedMemes() {
  var strHTML = '';
  var memes = [];
  for (var i = 1; i <= loadFromStorage('SavedNum'); i++) {
    memes.push(loadFromStorage(`meme-#${i}`));
  }

  memes.forEach((meme, idx) => {
    strHTML += `<img class="gallery-img" data-id="${idx}" src="${meme.url}" alt="" onclick="onImgSelect(this)">`;
  });
  var elContain = document.querySelector('.saved-container');
  elContain.innerHTML = strHTML;
}


function openSavedMemesGall() {
  document.querySelector('.editor-container').classList.add('hide');;
  document.querySelector('.imgs-container').classList.add('hide');
  document.querySelector('.about-me').classList.add('hide');
  document.querySelector('.saved-container').classList.remove('hide');
  renderSavedMemes();
  gMeme = null;
  gLineId = 0;
}

//ABOUT ME 
function openAboutMe() {
  document.querySelector('.editor-container').classList.add('hide');
  document.querySelector('.imgs-container').classList.add('hide');
  document.querySelector('.saved-container').classList.add('hide');
  document.querySelector('.about-me').classList.remove('hide');
}

function openMenu() {
  document.body.classList.toggle('menu-open');
}