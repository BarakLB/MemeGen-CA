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
    elContain = document.querySelector('.imgs-container');
    elContain.classList.remove('hide');
}
