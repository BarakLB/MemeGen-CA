'use strict';

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };
var gMeme;
var gLineId = 0;

function updateMeme(elImg) {
  var gCanvas = getgCanvas();
  
  gMeme = {
    selectedImgId: elImg.dataset.id,
    selectedLineIdx: 0,
    elImg,
    lines: [
      {
        id: gLineId,
        txt: 'Add Text Here',
        size: 20,
        align: 'center',
        color: 'white',
        strokecolor: 'black',
        x: gCanvas.width / 2,
        y: 50,
        rectSize: {
          pos: { x: 0, y: 50 - 20 },
          height: 65,
          width: gCanvas.width - 40
      },
      },
    ],
  };
}

function setLineTxt(text) {

  gMeme.lines[gMeme.selectedLineIdx].txt = text;
  writeText(gMeme.selectedLineIdx);
  renderMeme()
}

function updateMemeAlign(direction) {
  var meme = getgMeme();
  meme.lines[selectedLineIdx].align = direction;
}

function addLineinMeme(isEmpty) {
  if (isEmpty) gLineId = 0;
  var gCanvas = getgCanvas();
  var yPos = (gMeme.lines.length === 1) ? gCanvas.height - 20 : gCanvas.height / 2;
  if (gMeme.lines.length === 0) yPos = 50;
  console.log('yPos:', yPos);
  
  gMeme.lines.push({
    id: gLineId++,
    txt: '',
    size: 20,
    align: 'center',
    color: 'white',
    strokecolor: 'black',
    x: gCanvas.width / 2,
    y: yPos,
    rectSize: {
        pos: { x: 0, y: yPos - 20 },
        height: 65,
        width: gCanvas.width - 40
    },
  });
  if (!isEmpty) gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function changeColor() {
  var meme = getgMeme();
  meme.lines[meme.selectedLineIdx].color =
    document.querySelector('.color-input').value;
  renderMeme();
}

function changeStrokeColor() {
  var meme = getgMeme();
  meme.lines[meme.selectedLineIdx].strokecolor = document.querySelector(
    '.stroke-color-input'
  ).value;
  renderMeme();
}

function changeFontSize(delta) {
  var meme = getgMeme();
  meme.lines[meme.selectedLineIdx].size += delta;
}

function updateSelectedLine(meme) {
  !meme.selectedLineIdx
    ? (meme.selectedLineIdx = meme.lines.length - 1)
    : meme.selectedLineIdx--;
  return meme;
}

function updateMemeImg(elImg){
  var meme = getgMeme()
  meme.elImg = elImg
  return meme
}

// GET
function getgMeme() {
  return gMeme;
}

function getgMemeLines() {
  return gMeme.lines;
}


