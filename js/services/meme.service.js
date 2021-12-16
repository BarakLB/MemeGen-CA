'use strict';

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };
var gMeme;
var gLineId = 0;
var gSize = 20

function updateMeme(elImg) {
  var gCanvas = getgCanvas();
  setgSize()
  gMeme = {
    selectedImgId: elImg.dataset.id,
    selectedLineIdx: 0,
    elImg,
    lines: [
      {
        id: gLineId,
        txt: 'Add Text Here',
        size: gSize,
        align: 'center',
        color: 'white',
        strokecolor: 'black',
        x: gCanvas.width / 2,
        y: 50,
        rectSize: {
          pos: {
            x: 0,
            y: 50 - gSize,
          },
          height: 65,
          width: gCanvas.width - 40,
        },
        isSticker: false,
      },
    ],
  };
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
    size: gSize,
    align: 'center',
    color: 'white',
    strokecolor: 'black',
    x: gCanvas.width / 2,
    y: yPos,
    rectSize: {
      pos: { x: 0, y: yPos - gSize },
      height: 65,
      width: gCanvas.width - 40,
    },
    isSticker: false,
  });
  if (!isEmpty) gMeme.selectedLineIdx = gMeme.lines.length - 1;
}


function addStickerToMeme(elSticker){
  var canvas = getgCanvas()
  var meme = getgMeme()
  meme.lines.push({
    id: gIdLine++,
    text: '',
    isSticker: true,
    img: elSticker,
    x: canvas.width / 3,
    y: canvas.height / 3,
    sizeW: 100,
    sizeH: 100,
    size: 100,
    rectSize: {
        pos: { x: canvas.width / 3, y: canvas.height / 3 },
        height: 107,
        width: elSticker.width + 40
    },
  })
  var len = meme.lines.length - 1;
  meme.selectedLineIdx = meme.lines[len].id
}

//UPDATE MEME
function setLineTxt(text) {
  gMeme.lines[gMeme.selectedLineIdx].txt = text;
  writeText(gMeme.selectedLineIdx);
  renderMeme();
}

function updateMemeAlign(direction) {
  var meme = getgMeme();
  meme.lines[selectedLineIdx].align = direction;
}

function changeColor() {
  var meme = getgMeme();
  var idx = getCurrLine()
  meme.lines[idx].color = document.querySelector('.color-input').value;
  renderMeme();
}

function changeStrokeColor() {
  var meme = getgMeme();
  var idx = getCurrLine()
  meme.lines[idx].strokecolor = document.querySelector('.stroke-color-input').value;
  renderMeme();
}

function changeFontSize(delta) {
  var meme = getgMeme();
  var idx = getCurrLine()
  meme.lines[idx].size += delta;
  meme.lines[idx].rectSize.height += delta
}

function updateSelectedLine(meme) {
  !meme.selectedLineIdx
    ? (meme.selectedLineIdx = meme.lines.length - 1)
    : meme.selectedLineIdx--;
  return meme;
}

function updateMemeImg(elImg) {
  var meme = getgMeme();
  meme.elImg = elImg;
  return meme;
}

function setgSize() {
  var canvas = getgCanvas()
  if (canvas.width > 400) gSize = 45;
  if (canvas.width > 300) gSize = 35;
  else gSize = 30;

}

// GET
function getgMeme() {
  return gMeme;
}

function getgMemeLines() {
  return gMeme.lines;
}

function getCurrLine() {
  return gMeme.selectedLineIdx;
}
