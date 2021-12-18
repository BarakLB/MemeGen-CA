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
        font: 'Impact',
        align: 'center',
        color: 'white',
        strokecolor: 'black',
        x: gCanvas.width / 2,
        y: 100,
        rectSize: {
          pos: {
            x: 0,
            y: 90 - gSize,
          },
          height: 65,
          width: gCanvas.width,
        },
        isSticker: false,
        isDrag: false,
      },
    ],
  };
}

function addLineinMeme(isEmpty) {
  if (isEmpty) {
    gLineId = 0;
    console.log('here')
  }
  var gCanvas = getgCanvas();
  var yPos = (gMeme.lines.length === 1) ? gCanvas.height - 120 : gCanvas.height / 2;
  console.log('gMeme.lines.length:', gMeme.lines.length);
  console.log('gCanvas.height - 40:', gCanvas.height - 120);
  // console.log('gCanvas.height / 2:', gCanvas.height / 2);

  if (gMeme.lines.length === 0) yPos = 90;
  console.log('yPos:', yPos);

  gMeme.lines.push({
    id: gLineId++,
    txt: '',
    size: gSize,
    font: 'Impact',
    align: 'center',
    color: 'white',
    strokecolor: 'black',
    x: gCanvas.width / 2,
    y: yPos,
    rectSize: {
      pos: { x: 0, y: yPos - gSize - 10 },
      height: 65,
      width: gCanvas.width,
    },
    isSticker: false,
    stickerSize: 80,
    isDrag: false,
  });
  if (!isEmpty) gMeme.selectedLineIdx = gMeme.lines.length - 1;
}


function addStickerToMeme(elSticker) {
  var canvas = getgCanvas()
  var meme = getgMeme()
  addLineinMeme(false)
  var idx = getCurrLine()
  meme.lines[idx].isSticker = true
  meme.lines[idx]['img'] = elSticker
  meme.lines[idx].x = (canvas.width - 80) / 2
  meme.lines[idx].y = (canvas.width - 80) / 2
  meme.lines[idx].rectSize.height = meme.lines[idx].stickerSize
  meme.lines[idx].rectSize.width = meme.lines[idx].stickerSize

  meme.lines[idx].rectSize.pos.y = meme.lines[idx].y
  meme.lines[idx].rectSize.pos.x = meme.lines[idx].x


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


  if (meme.lines[idx].isSticker) {
    meme.lines[idx].stickerSize += delta
    meme.lines[idx].rectSize.width += delta

  } else {
    if (delta > 0) {
      meme.lines[idx].rectSize.pos.y -= delta
    } else {
      meme.lines[idx].rectSize.pos.y -= delta
    }
  }
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

function setisDrag(isDrag) {
  var meme = getgMeme()
  var idx = getCurrLine()
  meme.lines[idx].isDrag = isDrag
}

function setFont(font) {
  var meme = getgMeme()
  var idx = getCurrLine()
  meme.lines[idx].font = font
// renderMeme()
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
