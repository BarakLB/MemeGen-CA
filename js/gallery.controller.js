'use strict'

function renderImgs(imgs = getgImgs()) {
    var strHTML = '';
    imgs.forEach((img, idx) => {
      strHTML += `<img class="gallery-img" data-id="${idx}" src="${img.url}" alt="" onclick="onImgSelect(this)">`;
    });
    var elImgs = (document.querySelector('.imgs-container').innerHTML = strHTML);
}

function openGallery(){
  resizeCanvas();
    var elContain = document.querySelector('.editor-container');
    elContain.classList.add('hide');
    var elContain = document.querySelector('.saved-memes-gallery');
    elContain.classList.add('hide');
    elContain = document.querySelector('.imgs-container');
    elContain.classList.remove('hide');
}


function openSavedMemesGall(){
  resizeCanvas();
  var elContain = document.querySelector('.editor-container');
    elContain.classList.add('hide');
    elContain = document.querySelector('.imgs-container');
    elContain.classList.add('hide');
    elContain = document.querySelector('.saved-memes-gallery');
    elContain.classList.remove('hide');
  renderSavedMemes();

}

function renderSavedMemes() {
  var strHTML = '';
var memes=[]
  for (var i = 1; i <= loadFromStorage('SavedNum'); i++) {
    // var meme = loadFromStorage(`meme-#${i}`);
    // console.log('meme:', meme);
    memes.push(loadFromStorage(`meme-#${i}`))
    console.log('memes:', memes);
    
    // strHTML = `<img class="gallery-img" data-id="${i}" onclick="onImgSelect(this)" src="${meme.memeURL}" alt="">`;
    // console.log('meme.memeURL:', meme.memeURL);
    console.log('i:', i);
    
    
  }
  memes.forEach((meme, idx) => {
    strHTML += `<img class="gallery-img" data-id="${idx}" src="${meme.url}" alt="" onclick="onImgSelect(this)">`;
  });
  var elContain = document.querySelector('.saved-container')
  elContain.innerHTML = strHTML
}
