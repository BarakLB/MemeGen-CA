'use strict';
var gCanvas;
var gCtx;
var gSavedMemes;

function init() {
  createImages();
  renderImgs();
  gCanvas = document.querySelector('.canvas');
  gCtx = gCanvas.getContext('2d');
  resizeCanvas();
}

function onImgSelect(elImg) {
  if (document.querySelector('.editor-container').classList.contains('hide'))
    openEditor();

  var meme = getgMeme();
  if (!meme) resizeCanvas();
  var meme = getgMeme();
  gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
  if (!meme || !meme.lines.length) {
    updateMeme(elImg);
    renderMeme();
    return;
  } else updateMemeImg(elImg);
  gMeme.lines.forEach((line, idx) => writeText(idx, true));
  // drawRect(meme.selectedLineIdx);
}

//CANVAS FUNCS
function resizeCanvas() {
  var elContainer = document.querySelector('.canvas-container');
  gCanvas.width = elContainer.offsetWidth;
  gCanvas.height = elContainer.offsetWidth;
  renderMeme();
}

function renderMeme() {
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  var meme = getgMeme();
  if (meme) onImgSelect(meme.elImg);
}

function writeText(lineIdx, isBacked = false) {
  var meme = getgMeme();
  var memeLine = meme.lines[lineIdx];

  gCtx.lineWidth = memeLine.size / 10 - 1;
  gCtx.textAlign = memeLine.align;
  // gCtx.textAlign = 'center';
  gCtx.fillStyle = memeLine.color;
  gCtx.font = `${memeLine.size}px Impact`;
  gCtx.strokeStyle = memeLine.strokecolor;
  gCtx.fillText(memeLine.txt, memeLine.x, memeLine.y);
  gCtx.strokeText(memeLine.txt, memeLine.x, memeLine.y);
}

function drawRect(selectedLine) {
  var meme = getgMeme();
  var x = meme.lines[selectedLine].rectSize.pos.x;
  var y = meme.lines[selectedLine].rectSize.pos.y;
  // var y = selectedLine.rectSize.pos.y;
  console.log('x:', x);

  var width = gCanvas.width;
  var height = meme.lines[selectedLine].rectSize.height;
  // console.log('height:', height);

  gCtx.beginPath();
  gCtx.rect(x, y, width, height);
  gCtx.fillStyle = '#e4e4e42d';
  gCtx.fillRect(x, y, width, height);
  gCtx.strokeStyle = 'black';
  gCtx.stroke();
  gCtx.closePath();
}

//BUTTONS FUNCS
function onDownloadMeme(elLink) {
  onSaveMeme();
  var canvas = getgCanvas();
  var memeURL = canvas.toDataURL();
  elLink.href = memeURL;
  elLink.download = `meme-#${gSavedMemes}`;
  console.log('memeURL:', memeURL);
}

function onSaveMeme() {
  gSavedMemes = loadFromStorage('SavedNum');
  if (!gSavedMemes) {
    saveToStorage('SavedNum', 1);
    gSavedMemes = 1;
  } else gSavedMemes++;

  renderMeme();
  var canvas = getgCanvas();
  var url = canvas.toDataURL();
  
  saveToStorage(`meme-#${gSavedMemes}`, {gMeme, url});
  saveToStorage('SavedNum', gSavedMemes);
}

function onAddLine() {
  document.querySelector('.text-line').value = '';
  // document.querySelector('.text-line').focus();
  addLineinMeme(false);
}

function onSwitchLine() {
  var meme = getgMeme();
  updateSelectedLine(meme);
  renderMeme();
  // drawRect(meme.lines[meme.selectedLineIdx])
  document.querySelector('.text-line').value =
    meme.lines[meme.selectedLineIdx].txt;
}

function deleteLine() {
  document.querySelector('.text-line').value = '';
  var meme = getgMeme();
  if (meme.lines.length === 1 && meme.lines[0].txt === '') return;

  var currLine = meme.selectedLineIdx;
  meme.lines.splice(currLine, 1);
  if (meme.lines.length) {
    renderMeme();
    currLine
      ? (meme.selectedLineIdx = currLine - 1)
      : (meme.selectedLineIdx = 0);
  } else {
    addLineinMeme(true);
    renderMeme();
  }
}

function setAlign(direction) {
  var meme = getgMeme();
  console.log('meme:', meme);

  switch ((meme.lines[meme.selectedLineIdx].align = direction)) {
    case 'start': {
      meme.lines[meme.selectedLineIdx].x = 40;
      break;
    }
    case 'center': {
      meme.lines[meme.selectedLineIdx].x = gCanvas.width / 2;
      break;
    }
    case 'end': {
      meme.lines[meme.selectedLineIdx].x = gCanvas.width - 40;
      break;
    }
  }
  renderMeme();
}

function moveLinebyBtns(delta) {
  var meme = getgMeme();
  if (meme.lines.length === 1 && meme.lines[0].text === '') return;
  var lineIdx = meme.selectedLineIdx;
  var currLine = meme.lines[lineIdx];
  currLine.y += delta;
  renderMeme();
}

function openColorPicker(isStroke) {
  var elColor = document.querySelector('.color-input');
  if (isStroke) elColor = document.querySelector('.stroke-color-input'); //Boolean To Detemine if stroke/fill
  elColor.click();
}

function onChangeFontSize(delta) {
  changeFontSize(delta); // DOM
  renderMeme();
}

function openEditor() {
  var elContain = document.querySelector('.editor-container');
  elContain.classList.remove('hide');
  var elContain = document.querySelector('.saved-container');
  elContain.classList.add('hide');
  elContain = document.querySelector('.imgs-container');
  elContain.classList.add('hide');
  // renderMeme()
}

function getgCanvas() {
  return gCanvas;
}

