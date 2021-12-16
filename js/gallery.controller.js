'use strict';

//MAIN-GALL
function renderImgs(imgs = getgImgs()) {
  var strHTML = '';
  imgs.forEach((img, idx) => {
    strHTML += `<img class="gallery-img" data-id="${idx}" src="${img.url}" alt="" onclick="onImgSelect(this)">`;
  });
  var elImgs = (document.querySelector('.imgs-container').innerHTML = strHTML);
}


function openGallery() {
  var elContain = document.querySelector('.editor-container');
  elContain.classList.add('hide');
  var elContain = document.querySelector('.saved-container');
  elContain.classList.add('hide');
  elContain = document.querySelector('.imgs-container');
  elContain.classList.remove('hide');
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
  var elContain = document.querySelector('.editor-container');
  elContain.classList.add('hide');
  elContain = document.querySelector('.imgs-container');
  elContain.classList.add('hide');
  var elContain = document.querySelector('.saved-container');
  elContain.classList.remove('hide');
  renderSavedMemes();
  gMeme = null;
  gLineId=0;
}
