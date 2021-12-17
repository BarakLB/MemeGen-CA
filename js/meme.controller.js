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
  renderSavedMemes();
}

function onImgSelect(elImg) {
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
  gMeme.lines.forEach((line, idx) =>{
     writeText(idx, true)
    });
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

function writeText(lineIdx, isSavedtxt = false) {
  var meme = getgMeme();
  var currLine = meme.lines[lineIdx];
  if (!isSavedtxt) {
    // renderMeme()
    drawRect(currLine)
  }
  gCtx.lineWidth = currLine.size / 10 - 1;
  gCtx.textAlign = currLine.align;
  gCtx.textBaseling = "middle"
  gCtx.fillStyle = currLine.color;
  gCtx.font = `${currLine.size}px Impact`;
  gCtx.strokeStyle = currLine.strokecolor;
  gCtx.fillText(currLine.txt, currLine.x, currLine.y);
  gCtx.strokeText(currLine.txt, currLine.x, currLine.y);
}

function drawRect(selectedLine) {
  // console.log(selectedLine)
  var x = selectedLine.rectSize.pos.x;
  var y = selectedLine.rectSize.pos.y;
  var width = gCanvas.width;
  var height = selectedLine.rectSize.height;

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
  saveToStorage(`meme-#${gSavedMemes}`, { gMeme, url });
  saveToStorage('SavedNum', gSavedMemes);
}

function onAddLine() {
  document.querySelector('.text-line').value = '';
  document.querySelector('.text-line').focus();
  addLineinMeme(false);
  var idx = getCurrLine()
  renderMeme()
  drawRect(gMeme.lines[idx])
}

function onSwitchLine() {
  var meme = getgMeme();
  updateSelectedLine(meme);
  renderMeme();
  // drawRect(meme.lines[meme.selectedLineIdx])
  document.querySelector('.text-line').value = meme.lines[meme.selectedLineIdx].txt;
  drawRect(meme.lines[meme.selectedLineIdx]);
}

function deleteLine() {
  document.querySelector('.text-line').value = '';
  var meme = getgMeme();
  if (meme.lines.length === 1 && meme.lines[0].txt === '') return;

  var currLine = getCurrLine();
  meme.lines.splice(currLine, 1);
  if (meme.lines.length) {
    renderMeme();
    if (currLine) {
      drawRect(meme.lines[currLine - 1]);
      meme.selectedLineIdx = currLine - 1;
    } else {
      drawRect(meme.lines[0]);
      meme.selectedLineIdx = 0;
    }
  } else {
    addLineinMeme(true);
    renderMeme();
  }
}

function setAlign(direction) {
  var meme = getgMeme();

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
  var idx = getCurrLine()
  drawRect(meme.lines[idx])
}

function moveLinebyBtns(delta) {
  var meme = getgMeme();
  if (meme.lines.length === 1 && meme.lines[0].text === '') return;
  var idx = getCurrLine()
  var currLine = meme.lines[idx];
  currLine.y += delta;
  currLine.rectSize.pos.y += delta;
  renderMeme();
  drawRect(currLine)
}

function openColorPicker(isStroke) {
  var elColor = document.querySelector('.color-input');
  if (isStroke) elColor = document.querySelector('.stroke-color-input'); //Boolean To Detemine if stroke/fill
  elColor.click();
}

function onChangeFontSize(delta) {
  var meme = getgMeme();
  var idx = getCurrLine();
  changeFontSize(delta);
  renderMeme();
  drawRect(meme.lines[idx]);
}

function openEditor() {
  document.querySelector('.saved-container').classList.add('hide');
  document.querySelector('.imgs-container').classList.add('hide');
  document.querySelector('.about-me').classList.add('hide');
  document.querySelector('.editor-container').classList.remove('hide');
}

function getgCanvas() {
  return gCanvas;
}
